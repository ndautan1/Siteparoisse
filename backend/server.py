from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
import aiofiles

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Railway injecte MONGO_URL via le plugin MongoDB (ex: MONGO_URL=mongodb://mongo:27017)
# En local, on utilise le .env
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'notre_dame_autan')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

app = FastAPI(title="Notre Dame d'Autan API", version="1.0.0")
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')

# ============ MODELS ============

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    token: str
    username: str

class NewsCreate(BaseModel):
    title: str
    content: str
    category: Optional[str] = "Actualité"
    image_url: Optional[str] = None

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    image_url: Optional[str] = None
    published: Optional[bool] = None

class News(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    content: str
    category: str
    image_url: Optional[str] = None
    published: bool = True
    created_at: str

class MassTimeCreate(BaseModel):
    day: str
    time: str
    location: str
    mass_type: Optional[str] = "Messe"
    date: Optional[str] = None  # Format: "YYYY-MM-DD"

class MassTimeUpdate(BaseModel):
    day: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    mass_type: Optional[str] = None
    date: Optional[str] = None

class MassTime(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    day: str
    time: str
    location: str
    mass_type: str
    date: Optional[str] = None

class EventCreate(BaseModel):
    title: str
    description: Optional[str] = ""
    date: str  # Format: "YYYY-MM-DD"
    time: str  # Format: "HH:MM"
    end_time: Optional[str] = None
    location: str
    category: str = "Communauté"

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    end_time: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None

class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    description: str
    date: str
    time: str
    end_time: Optional[str] = None
    location: str
    category: str
    created_at: str

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str

class SubscriberEmail(BaseModel):
    email: str

class SubscriberResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    subscribed_at: str

class LetterCreate(BaseModel):
    title: str
    content: Optional[str] = ""
    date: str  # Format: "YYYY-MM-DD"
    file_url: Optional[str] = None

class LetterUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    date: Optional[str] = None
    file_url: Optional[str] = None

class Letter(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    title: str
    content: str
    date: str
    file_url: Optional[str] = None
    created_at: str

class ContactResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str
    read: bool = False

class FuneralCreate(BaseModel):
    deceased_name: str
    funeral_date: str  # Format: "YYYY-MM-DD"
    funeral_time: str  # Format: "HH:MM"
    location: str
    ceremony_type: Optional[str] = "Messe de funérailles"

class FuneralUpdate(BaseModel):
    deceased_name: Optional[str] = None
    funeral_date: Optional[str] = None
    funeral_time: Optional[str] = None
    location: Optional[str] = None
    ceremony_type: Optional[str] = None

class Funeral(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    deceased_name: str
    funeral_date: str
    funeral_time: str
    location: str
    ceremony_type: str
    created_at: str

# ============ AUTH HELPERS ============

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=24)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm="HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=["HS256"])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Notre Dame d'Autan API"}

# AUTH
@api_router.post("/auth/login", response_model=AdminResponse)
async def login(credentials: AdminLogin):
    admin = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if not admin or not verify_password(credentials.password, admin['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"sub": credentials.username})
    return AdminResponse(token=token, username=credentials.username)

# NEWS
@api_router.get("/news", response_model=List[News])
async def get_news(published_only: bool = False):
    query = {"published": True} if published_only else {}
    news_list = await db.news.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    return news_list

@api_router.post("/news", response_model=News)
async def create_news(news: NewsCreate, username: str = Depends(get_current_user)):
    news_dict = news.model_dump()
    news_obj = News(
        id=str(uuid.uuid4()),
        **news_dict,
        created_at=datetime.now(timezone.utc).isoformat()
    )
    doc = news_obj.model_dump()
    await db.news.insert_one(doc)
    return news_obj

@api_router.put("/news/{news_id}", response_model=News)
async def update_news(news_id: str, news_update: NewsUpdate, username: str = Depends(get_current_user)):
    existing = await db.news.find_one({"id": news_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="News not found")
    
    update_data = {k: v for k, v in news_update.model_dump().items() if v is not None}
    if update_data:
        await db.news.update_one({"id": news_id}, {"$set": update_data})
    
    updated = await db.news.find_one({"id": news_id}, {"_id": 0})
    return News(**updated)

@api_router.delete("/news/{news_id}")
async def delete_news(news_id: str, username: str = Depends(get_current_user)):
    result = await db.news.delete_one({"id": news_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"message": "News deleted"}

class BulkDeleteRequest(BaseModel):
    ids: List[str]

@api_router.post("/news/bulk-delete")
async def bulk_delete_news(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.news.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

@api_router.post("/mass-times/bulk-delete")
async def bulk_delete_mass_times(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.mass_times.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

@api_router.post("/funerals/bulk-delete")
async def bulk_delete_funerals(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.funerals.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

@api_router.post("/events/bulk-delete")
async def bulk_delete_events(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.events.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

@api_router.post("/letters/bulk-delete")
async def bulk_delete_letters(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.letters.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

# MASS TIMES
@api_router.get("/mass-times", response_model=List[MassTime])
async def get_mass_times():
    times = await db.mass_times.find({}, {"_id": 0}).sort("date", 1).to_list(500)
    return times

@api_router.post("/mass-times", response_model=MassTime)
async def create_mass_time(mass_time: MassTimeCreate, username: str = Depends(get_current_user)):
    mass_dict = mass_time.model_dump()
    mass_obj = MassTime(id=str(uuid.uuid4()), **mass_dict)
    doc = mass_obj.model_dump()
    await db.mass_times.insert_one(doc)
    return mass_obj

class MassTimeBulkCreate(BaseModel):
    items: List[MassTimeCreate]

@api_router.post("/mass-times/bulk", response_model=List[MassTime])
async def bulk_create_mass_times(bulk: MassTimeBulkCreate, username: str = Depends(get_current_user)):
    created = []
    for item in bulk.items:
        mass_dict = item.model_dump()
        mass_obj = MassTime(id=str(uuid.uuid4()), **mass_dict)
        doc = mass_obj.model_dump()
        await db.mass_times.insert_one(doc)
        created.append(mass_obj)
    return created

@api_router.put("/mass-times/{mass_id}", response_model=MassTime)
async def update_mass_time(mass_id: str, mass_update: MassTimeUpdate, username: str = Depends(get_current_user)):
    existing = await db.mass_times.find_one({"id": mass_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Mass time not found")
    
    update_data = {k: v for k, v in mass_update.model_dump().items() if v is not None}
    if update_data:
        await db.mass_times.update_one({"id": mass_id}, {"$set": update_data})
    
    updated = await db.mass_times.find_one({"id": mass_id}, {"_id": 0})
    return MassTime(**updated)

@api_router.delete("/mass-times/{mass_id}")
async def delete_mass_time(mass_id: str, username: str = Depends(get_current_user)):
    result = await db.mass_times.delete_one({"id": mass_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mass time not found")
    return {"message": "Mass time deleted"}

# FUNERALS
@api_router.get("/funerals", response_model=List[Funeral])
async def get_funerals():
    funerals = await db.funerals.find({}, {"_id": 0}).sort("funeral_date", 1).to_list(100)
    return funerals

@api_router.post("/funerals", response_model=Funeral)
async def create_funeral(funeral: FuneralCreate, username: str = Depends(get_current_user)):
    funeral_dict = funeral.model_dump()
    funeral_obj = Funeral(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc).isoformat(),
        **funeral_dict
    )
    doc = funeral_obj.model_dump()
    await db.funerals.insert_one(doc)
    return funeral_obj

@api_router.put("/funerals/{funeral_id}", response_model=Funeral)
async def update_funeral(funeral_id: str, funeral_update: FuneralUpdate, username: str = Depends(get_current_user)):
    existing = await db.funerals.find_one({"id": funeral_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Funeral not found")
    
    update_data = {k: v for k, v in funeral_update.model_dump().items() if v is not None}
    if update_data:
        await db.funerals.update_one({"id": funeral_id}, {"$set": update_data})
    
    updated = await db.funerals.find_one({"id": funeral_id}, {"_id": 0})
    return Funeral(**updated)

@api_router.delete("/funerals/{funeral_id}")
async def delete_funeral(funeral_id: str, username: str = Depends(get_current_user)):
    result = await db.funerals.delete_one({"id": funeral_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Funeral not found")
    return {"message": "Funeral deleted"}

# EVENTS
@api_router.get("/events", response_model=List[Event])
async def get_events(category: Optional[str] = None, include_past: bool = False):
    query = {}
    if category:
        query["category"] = category
    if not include_past:
        today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        query["date"] = {"$gte": today}
    events = await db.events.find(query, {"_id": 0}).sort("date", 1).to_list(200)
    return events

@api_router.post("/events", response_model=Event)
async def create_event(event: EventCreate, username: str = Depends(get_current_user)):
    event_dict = event.model_dump()
    event_obj = Event(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc).isoformat(),
        **event_dict
    )
    doc = event_obj.model_dump()
    await db.events.insert_one(doc)
    return event_obj

@api_router.put("/events/{event_id}", response_model=Event)
async def update_event(event_id: str, event_update: EventUpdate, username: str = Depends(get_current_user)):
    existing = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Event not found")
    update_data = {k: v for k, v in event_update.model_dump().items() if v is not None}
    if update_data:
        await db.events.update_one({"id": event_id}, {"$set": update_data})
    updated = await db.events.find_one({"id": event_id}, {"_id": 0})
    return Event(**updated)

@api_router.delete("/events/{event_id}")
async def delete_event(event_id: str, username: str = Depends(get_current_user)):
    result = await db.events.delete_one({"id": event_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"message": "Event deleted"}

# CONTACT
@api_router.post("/contact", response_model=ContactResponse)
async def send_contact_message(msg: ContactMessage):
    contact_obj = ContactResponse(
        id=str(uuid.uuid4()),
        name=msg.name,
        email=msg.email,
        subject=msg.subject,
        message=msg.message,
        created_at=datetime.now(timezone.utc).isoformat(),
        read=False
    )
    doc = contact_obj.model_dump()
    await db.contact_messages.insert_one(doc)
    return contact_obj

@api_router.get("/contact", response_model=List[ContactResponse])
async def get_contact_messages(username: str = Depends(get_current_user)):
    messages = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return messages

# NEWSLETTER SUBSCRIBERS
@api_router.post("/subscribers", response_model=SubscriberResponse)
async def subscribe(sub: SubscriberEmail):
    existing = await db.subscribers.find_one({"email": sub.email}, {"_id": 0})
    if existing:
        return SubscriberResponse(**existing)
    sub_obj = SubscriberResponse(
        id=str(uuid.uuid4()),
        email=sub.email,
        subscribed_at=datetime.now(timezone.utc).isoformat()
    )
    doc = sub_obj.model_dump()
    await db.subscribers.insert_one(doc)
    return sub_obj

@api_router.get("/subscribers", response_model=List[SubscriberResponse])
async def get_subscribers(username: str = Depends(get_current_user)):
    subs = await db.subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(500)
    return subs

@api_router.delete("/subscribers/{subscriber_id}")
async def delete_subscriber(subscriber_id: str, username: str = Depends(get_current_user)):
    result = await db.subscribers.delete_one({"id": subscriber_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return {"message": "Subscriber deleted"}

@api_router.post("/subscribers/bulk-delete")
async def bulk_delete_subscribers(req: BulkDeleteRequest, username: str = Depends(get_current_user)):
    result = await db.subscribers.delete_many({"id": {"$in": req.ids}})
    return {"deleted": result.deleted_count}

# CONTACT MESSAGE MANAGEMENT
@api_router.put("/contact/{message_id}/read")
async def mark_message_read(message_id: str, username: str = Depends(get_current_user)):
    result = await db.contact_messages.update_one({"id": message_id}, {"$set": {"read": True}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Marked as read"}

@api_router.delete("/contact/{message_id}")
async def delete_contact_message(message_id: str, username: str = Depends(get_current_user)):
    result = await db.contact_messages.delete_one({"id": message_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Message not found")
    return {"message": "Message deleted"}

# DASHBOARD STATS
@api_router.get("/stats")
async def get_stats(username: str = Depends(get_current_user)):
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    news_count = await db.news.count_documents({})
    events_total = await db.events.count_documents({})
    events_upcoming = await db.events.count_documents({"date": {"$gte": today}})
    mass_count = await db.mass_times.count_documents({})
    funerals_count = await db.funerals.count_documents({})
    letters_count = await db.letters.count_documents({})
    subscribers_count = await db.subscribers.count_documents({})
    messages_count = await db.contact_messages.count_documents({})
    messages_unread = await db.contact_messages.count_documents({"read": {"$ne": True}})
    return {
        "news": news_count,
        "events_total": events_total,
        "events_upcoming": events_upcoming,
        "mass_times": mass_count,
        "funerals": funerals_count,
        "letters": letters_count,
        "subscribers": subscribers_count,
        "messages": messages_count,
        "messages_unread": messages_unread,
    }

# LETTERS (Lettre du Père Daniel)
@api_router.get("/letters", response_model=List[Letter])
async def get_letters():
    letters = await db.letters.find({}, {"_id": 0}).sort("date", -1).to_list(200)
    return letters

@api_router.post("/letters", response_model=Letter)
async def create_letter(letter: LetterCreate, username: str = Depends(get_current_user)):
    letter_dict = letter.model_dump()
    letter_obj = Letter(
        id=str(uuid.uuid4()),
        created_at=datetime.now(timezone.utc).isoformat(),
        **letter_dict
    )
    doc = letter_obj.model_dump()
    await db.letters.insert_one(doc)
    return letter_obj

@api_router.put("/letters/{letter_id}", response_model=Letter)
async def update_letter(letter_id: str, letter_update: LetterUpdate, username: str = Depends(get_current_user)):
    existing = await db.letters.find_one({"id": letter_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Letter not found")
    update_data = {k: v for k, v in letter_update.model_dump().items() if v is not None}
    if update_data:
        await db.letters.update_one({"id": letter_id}, {"$set": update_data})
    updated = await db.letters.find_one({"id": letter_id}, {"_id": 0})
    return Letter(**updated)

@api_router.delete("/letters/{letter_id}")
async def delete_letter(letter_id: str, username: str = Depends(get_current_user)):
    result = await db.letters.delete_one({"id": letter_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Letter not found")
    return {"message": "Letter deleted"}

# FILE UPLOAD
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
ALLOWED_DOC_TYPES = {"application/pdf"}
ALLOWED_TYPES = ALLOWED_IMAGE_TYPES | ALLOWED_DOC_TYPES
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...), username: str = Depends(get_current_user)):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail=f"Type de fichier non autorisé: {file.content_type}")
    
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Fichier trop volumineux (max 10 Mo)")
    
    ext = Path(file.filename).suffix.lower() if file.filename else ".bin"
    filename = f"{uuid.uuid4()}{ext}"
    filepath = UPLOAD_DIR / filename
    
    async with aiofiles.open(filepath, "wb") as f:
        await f.write(contents)
    
    file_url = f"/api/uploads/{filename}"
    return {"file_url": file_url, "filename": file.filename, "size": len(contents)}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/api/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ HEALTH CHECK (Railway) ============

@app.get("/api/health")
async def health_check():
    """Health check endpoint pour Railway"""
    try:
        await client.admin.command('ping')
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    return {
        "status": "healthy",
        "database": db_status,
        "service": "notre-dame-autan-api"
    }

# ============ LIFECYCLE ============

@app.on_event("startup")
async def startup_event():
    logger.info(f"🚀 Backend démarré - DB: {db_name}")
    try:
        await client.admin.command('ping')
        logger.info("✅ Connexion MongoDB réussie")
        
        # Créer le compte admin via variables d'environnement
        admin_username = os.environ.get('ADMIN_USERNAME')
        admin_password = os.environ.get('ADMIN_PASSWORD')
        
        if admin_username and admin_password:
            existing_admin = await db.admins.find_one({"username": admin_username})
            if not existing_admin:
                password_hash = bcrypt.hashpw(admin_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                await db.admins.insert_one({
                    "id": str(uuid.uuid4()),
                    "username": admin_username,
                    "password_hash": password_hash,
                    "created_at": datetime.now(timezone.utc).isoformat()
                })
                logger.info(f"✅ Compte admin '{admin_username}' créé")
            else:
                logger.info(f"✅ Compte admin '{admin_username}' existant")
        else:
            logger.info("ℹ️ Pas de ADMIN_USERNAME/ADMIN_PASSWORD définis, pas de création auto")
    except Exception as e:
        logger.warning(f"⚠️ MongoDB pas encore disponible: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
    logger.info("🔌 Connexion MongoDB fermée")