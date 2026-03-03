import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Newspaper, Clock, Calendar, Mail, Upload, Copy, X, FileText, Repeat, LayoutDashboard, Users, Download, Eye, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { format, addWeeks, addMonths, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import LocationAutocomplete from '@/components/LocationAutocomplete';
import ChristianCross from '@/components/ChristianCross';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { APP_VERSION } from '@/version';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [news, setNews] = useState([]);
  const [massTimes, setMassTimes] = useState([]);
  const [funerals, setFunerals] = useState([]);
  const [events, setEvents] = useState([]);
  const [letters, setLetters] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // News Form State
  const [newsForm, setNewsForm] = useState({ title: '', content: '', category: 'Actualité', image_url: 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/xcdoobf2_Actualit%C3%A9-d%C3%A9faut.png' });
  const [editingNews, setEditingNews] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [customMassType, setCustomMassType] = useState('');
  const [customCeremonyType, setCustomCeremonyType] = useState('');
  const [customEventCategory, setCustomEventCategory] = useState('');

  // Mass Times Form State
  const todayStr = new Date().toISOString().split('T')[0];
  const getInitialDay = (dateStr) => { const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']; return days[new Date(dateStr + 'T00:00:00').getDay()]; };
  const [massForm, setMassForm] = useState({ day: getInitialDay(todayStr), time: '10:00', location: '', mass_type: 'Messe Dominicale', date: todayStr });
  const [editingMass, setEditingMass] = useState(null);
  const [repeatMode, setRepeatMode] = useState('none'); // none, week, 2weeks, month
  const [repeatUntil, setRepeatUntil] = useState('');

  // Funerals Form State
  const [funeralForm, setFuneralForm] = useState({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
  const [editingFuneral, setEditingFuneral] = useState(null);

  // Events Form State
  const [eventForm, setEventForm] = useState({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
  const [editingEvent, setEditingEvent] = useState(null);

  // Letters Form State
  const [letterForm, setLetterForm] = useState({ title: '', content: '', date: '', file_url: '' });
  const [editingLetter, setEditingLetter] = useState(null);

  // Bulk selection states
  const [selectedNews, setSelectedNews] = useState([]);
  const [selectedMass, setSelectedMass] = useState([]);
  const [selectedFunerals, setSelectedFunerals] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);

  // File upload states
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [dragOverImage, setDragOverImage] = useState(false);
  const [dragOverFile, setDragOverFile] = useState(false);

  const NEWS_CATEGORIES = [
    'Actualité',
    'Liturgie',
    'Communauté',
    'Événement',
    'Annonce',
    'Vie paroissiale',
    'Solidarité',
    'Formation',
  ];

  const DEFAULT_CATEGORY_IMAGES = {
    'Actualité': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/xcdoobf2_Actualit%C3%A9-d%C3%A9faut.png',
    'Annonce': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/0ey6uzxa_Annonce-d%C3%A9faut.png',
    'Communauté': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/q6ijalbn_Communaut%C3%A9-d%C3%A9faut.png',
    'Événement': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/1vio65rk_Ev%C3%A8nement-d%C3%A9faut.png',
    'Liturgie': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/ah90qnjg_Liturgie-d%C3%A9faut.png',
    'Formation': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/3qrxsfae_Formation-d%C3%A9faut.png',
    'Solidarité': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/vj7uvn3t_Solidarit%C3%A9-d%C3%A9faut.png',
    'Vie paroissiale': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/qiitewn6_Vie-paroissiale-d%C3%A9faut.png',
    'Autre': 'https://customer-assets.emergentagent.com/job_9a3ee4fd-0a90-44f7-b4d0-970fb3b3dfaf/artifacts/rise721e_Autre-d%C3%A9faut.png',
  };

  const MASS_TYPES = ['Messe Dominicale', 'Messe', 'Messe anticipée', 'Vêpres', 'Adoration', 'Confession', 'Laudes', 'Chapelet'];
  const CEREMONY_TYPES = ['Messe de funérailles', 'Célébration de la Parole', 'Bénédiction'];
  const EVENT_CATEGORIES = ['Communauté', 'Liturgie', 'Formation', 'Jeunesse', 'Solidarité', 'Concert', 'Pèlerinage'];

  const uploadFile = async (file, type = 'image') => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post(`${BACKEND_URL}/api/upload`, formData, {
      headers: { ...getAuthHeaders(), 'Content-Type': 'multipart/form-data' },
    });
    return res.data.file_url;
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowed.includes(file.type)) {
      toast.error('Format non supporté. Utilisez JPG, PNG, GIF ou WebP.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image trop volumineuse (max 10 Mo)');
      return;
    }
    setUploadingImage(true);
    try {
      const url = await uploadFile(file, 'image');
      setNewsForm(prev => ({ ...prev, image_url: url }));
      toast.success('Image uploadée');
    } catch (err) {
      toast.error("Erreur lors de l'upload de l'image");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleLetterFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      toast.error('Seuls les fichiers PDF sont acceptés.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Fichier trop volumineux (max 10 Mo)');
      return;
    }
    setUploadingFile(true);
    try {
      const url = await uploadFile(file, 'pdf');
      setLetterForm(prev => ({ ...prev, file_url: url }));
      toast.success('Fichier PDF uploadé');
    } catch (err) {
      toast.error("Erreur lors de l'upload du fichier");
    } finally {
      setUploadingFile(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [newsRes, massRes, funeralsRes, eventsRes, lettersRes, subsRes, msgRes, statsRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/news`),
        axios.get(`${BACKEND_URL}/api/mass-times`),
        axios.get(`${BACKEND_URL}/api/funerals`),
        axios.get(`${BACKEND_URL}/api/events?include_past=true`),
        axios.get(`${BACKEND_URL}/api/letters`),
        axios.get(`${BACKEND_URL}/api/subscribers`, { headers: getAuthHeaders() }),
        axios.get(`${BACKEND_URL}/api/contact`, { headers: getAuthHeaders() }),
        axios.get(`${BACKEND_URL}/api/stats`, { headers: getAuthHeaders() }),
      ]);
      setNews(newsRes.data);
      setMassTimes(massRes.data);
      setFunerals(funeralsRes.data);
      setEvents(eventsRes.data);
      setLetters(lettersRes.data);
      setSubscribers(subsRes.data);
      setContactMessages(msgRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_username');
    navigate('/admin/login');
  };

  // NEWS HANDLERS
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newsForm };
      if (payload.category === 'Autre' && customCategory.trim()) {
        payload.category = customCategory.trim();
      }
      if (editingNews) {
        await axios.put(
          `${BACKEND_URL}/api/news/${editingNews.id}`,
          payload,
          { headers: getAuthHeaders() }
        );
        toast.success('Actualité mise à jour');
      } else {
        await axios.post(`${BACKEND_URL}/api/news`, payload, { headers: getAuthHeaders() });
        toast.success('Actualité créée');
      }
      setNewsForm({ title: '', content: '', category: 'Actualité', image_url: DEFAULT_CATEGORY_IMAGES['Actualité'] || '' });
      setCustomCategory('');
      setEditingNews(null);
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditNews = (item) => {
    setEditingNews(item);
    const cat = item.category || 'Actualité';
    setNewsForm({ title: item.title || '', content: item.content || '', category: cat, image_url: item.image_url || '' });
    // Si la catégorie est personnalisée, mettre à jour customCategory
    if (!NEWS_CATEGORIES.includes(cat)) {
      setCustomCategory(cat);
    } else {
      setCustomCategory('');
    }
    // Scroll vers le formulaire
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Supprimer cette actualité ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/news/${id}`, { headers: getAuthHeaders() });
      toast.success('Actualité supprimée');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Helper: get French day name from date string
  const getDayName = (dateStr) => {
    if (!dateStr) return '';
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const d = new Date(dateStr + 'T00:00:00');
    return days[d.getDay()];
  };

  // MASS TIMES HANDLERS
  const handleMassSubmit = async (e) => {
    e.preventDefault();
    try {
      const resolvedMassType = massForm.mass_type === 'Autre' && customMassType.trim() ? customMassType.trim() : massForm.mass_type;
      const dayName = getDayName(massForm.date) || massForm.day;
      const basePayload = { ...massForm, day: dayName, mass_type: resolvedMassType };

      if (editingMass) {
        await axios.put(
          `${BACKEND_URL}/api/mass-times/${editingMass.id}`,
          basePayload,
          { headers: getAuthHeaders() }
        );
        toast.success('Horaire mis à jour');
      } else if (repeatMode !== 'none' && repeatUntil && massForm.date) {
        // Generate repeated entries
        const items = [];
        let currentDate = new Date(massForm.date + 'T00:00:00');
        const endDate = new Date(repeatUntil + 'T00:00:00');
        const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

        while (currentDate <= endDate) {
          const yyyy = currentDate.getFullYear();
          const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
          const dd = String(currentDate.getDate()).padStart(2, '0');
          const dateStr = `${yyyy}-${mm}-${dd}`;
          items.push({
            day: days[currentDate.getDay()],
            time: massForm.time,
            location: massForm.location,
            mass_type: resolvedMassType,
            date: dateStr,
          });
          if (repeatMode === 'week') currentDate = addWeeks(currentDate, 1);
          else if (repeatMode === '2weeks') currentDate = addWeeks(currentDate, 2);
          else if (repeatMode === 'month') currentDate = addMonths(currentDate, 1);
          else break;
        }

        await axios.post(`${BACKEND_URL}/api/mass-times/bulk`, { items }, { headers: getAuthHeaders() });
        toast.success(`${items.length} horaires créés`);
      } else {
        await axios.post(`${BACKEND_URL}/api/mass-times`, basePayload, { headers: getAuthHeaders() });
        toast.success('Horaire créé');
      }
      setMassForm({ day: getInitialDay(todayStr), time: '10:00', location: '', mass_type: 'Messe Dominicale', date: todayStr });
      setCustomMassType('');
      setEditingMass(null);
      setRepeatMode('none');
      setRepeatUntil('');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditMass = (item) => {
    setEditingMass(item);
    setMassForm({ day: item.day, time: item.time, location: item.location, mass_type: item.mass_type, date: item.date || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateMass = (item) => {
    setEditingMass(null);
    setMassForm({ day: item.day, time: item.time, location: item.location, mass_type: item.mass_type, date: item.date || todayStr });
    toast.info('Horaire dupliqué — modifiez et cliquez "Ajouter"');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMass = async (id) => {
    if (!window.confirm('Supprimer cet horaire ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/mass-times/${id}`, { headers: getAuthHeaders() });
      toast.success('Horaire supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // FUNERALS CRUD
  const handleSubmitFuneral = async (e) => {
    e.preventDefault();
    try {
      const resolvedCeremony = funeralForm.ceremony_type === 'Autre' && customCeremonyType.trim() ? customCeremonyType.trim() : funeralForm.ceremony_type;
      const payload = { ...funeralForm, ceremony_type: resolvedCeremony };
      if (editingFuneral) {
        await axios.put(`${BACKEND_URL}/api/funerals/${editingFuneral.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Funérailles modifiées');
        setEditingFuneral(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/funerals`, payload, { headers: getAuthHeaders() });
        toast.success('Funérailles ajoutées');
      }
      setFuneralForm({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
      setCustomCeremonyType('');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const handleEditFuneral = (funeral) => {
    setEditingFuneral(funeral);
    setFuneralForm({
      deceased_name: funeral.deceased_name,
      funeral_date: funeral.funeral_date,
      funeral_time: funeral.funeral_time,
      location: funeral.location,
      ceremony_type: funeral.ceremony_type
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteFuneral = async (id) => {
    if (!window.confirm('Supprimer cette cérémonie ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/funerals/${id}`, { headers: getAuthHeaders() });
      toast.success('Funérailles supprimées');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // EVENTS HANDLERS
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const resolvedEventCat = eventForm.category === 'Autre' && customEventCategory.trim() ? customEventCategory.trim() : eventForm.category;
    const payload = { ...eventForm, category: resolvedEventCat };
    if (!payload.end_time) delete payload.end_time;
    try {
      if (editingEvent) {
        await axios.put(`${BACKEND_URL}/api/events/${editingEvent.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Événement mis à jour');
        setEditingEvent(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/events`, payload, { headers: getAuthHeaders() });
        toast.success('Événement créé');
      }
      setEventForm({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
      setCustomEventCategory('');
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleEditEvent = (item) => {
    setEditingEvent(item);
    setEventForm({
      title: item.title,
      description: item.description || '',
      date: item.date,
      time: item.time,
      end_time: item.end_time || '',
      location: item.location,
      category: item.category,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Supprimer cet événement ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/events/${id}`, { headers: getAuthHeaders() });
      toast.success('Événement supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // LETTERS HANDLERS
  const handleLetterSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...letterForm };
      if (!payload.file_url) delete payload.file_url;
      if (!payload.content) payload.content = '';
      if (editingLetter) {
        await axios.put(`${BACKEND_URL}/api/letters/${editingLetter.id}`, payload, { headers: getAuthHeaders() });
        toast.success('Lettre mise à jour');
        setEditingLetter(null);
      } else {
        await axios.post(`${BACKEND_URL}/api/letters`, payload, { headers: getAuthHeaders() });
        toast.success('Lettre publiée');
      }
      setLetterForm({ title: '', content: '', date: '', file_url: '' });
      fetchData();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement");
    }
  };

  const handleEditLetter = (item) => {
    setEditingLetter(item);
    setLetterForm({ title: item.title, content: item.content || '', date: item.date, file_url: item.file_url || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteLetter = async (id) => {
    if (!window.confirm('Supprimer cette lettre ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/letters/${id}`, { headers: getAuthHeaders() });
      toast.success('Lettre supprimée');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm('Supprimer cet abonné ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/subscribers/${id}`, { headers: getAuthHeaders() });
      toast.success('Abonné supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleMarkMessageRead = async (id) => {
    try {
      await axios.put(`${BACKEND_URL}/api/contact/${id}/read`, {}, { headers: getAuthHeaders() });
      fetchData();
    } catch (error) {
      toast.error('Erreur');
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Supprimer ce message ?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/contact/${id}`, { headers: getAuthHeaders() });
      toast.success('Message supprimé');
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const exportSubscribersCSV = () => {
    if (subscribers.length === 0) return;
    const header = 'Email,Date inscription\n';
    const rows = subscribers.map(s => `${s.email},${s.subscribed_at}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abonnes_newsletter_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Export CSV téléchargé');
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy à HH:mm', { locale: fr });
    } catch {
      return dateString;
    }
  };

  // BULK DELETE HELPERS
  const toggleSelect = (id, selected, setSelected) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = (items, selected, setSelected) => {
    if (selected.length === items.length) {
      setSelected([]);
    } else {
      setSelected(items.map(i => i.id));
    }
  };

  const handleBulkDelete = async (endpoint, selected, setSelected, label) => {
    if (selected.length === 0) return;
    if (!window.confirm(`Supprimer ${selected.length} ${label} ?`)) return;
    try {
      await axios.post(`${BACKEND_URL}/api/${endpoint}/bulk-delete`, { ids: selected }, { headers: getAuthHeaders() });
      toast.success(`${selected.length} ${label} supprimé(e)s`);
      setSelected([]);
      fetchData();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const BulkBar = ({ selected, setSelected, items, endpoint, label }) => (
    <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2 mb-3">
      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input
          type="checkbox"
          checked={items.length > 0 && selected.length === items.length}
          onChange={() => toggleSelectAll(items, selected, setSelected)}
          className="w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold"
        />
        {selected.length > 0 ? `${selected.length} sélectionné(s)` : 'Tout sélectionner'}
      </label>
      {selected.length > 0 && (
        <button
          onClick={() => handleBulkDelete(endpoint, selected, setSelected, label)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-medium transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Supprimer ({selected.length})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-paper" data-testid="admin-dashboard">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://customer-assets.emergentagent.com/job_c3efae68-56d0-4924-8ecf-4f7502ce3630/artifacts/34n0n91l_Notre-Dame-d-Autan.png"
              alt="Notre Dame d'Autan"
              className="h-10 w-auto"
            />
            <h1 className="font-serif text-xl sm:text-2xl text-slate-deep">Administration Notre Dame d'Autan</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-slate-600 hover:text-gold transition-colors"
            data-testid="logout-button"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
          <span className="text-xs text-slate-400 ml-2">v{APP_VERSION}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 border-b border-slate-200 overflow-x-auto pb-px">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
            { id: 'news', icon: Newspaper, label: 'Actualités' },
            { id: 'mass', icon: Clock, label: 'Messes' },
            { id: 'funerals', icon: () => <ChristianCross className="w-5 h-5" />, label: 'Funérailles' },
            { id: 'events', icon: Calendar, label: 'Événements' },
            { id: 'letters', icon: Mail, label: 'Lettres' },
            { id: 'messages', icon: MessageSquare, label: 'Messages', badge: stats?.messages_unread },
            { id: 'subscribers', icon: Users, label: 'Abonnés' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-3 font-medium transition-colors flex items-center space-x-2 whitespace-nowrap text-sm ${
                activeTab === tab.id ? 'text-gold border-b-2 border-gold' : 'text-slate-600 hover:text-slate-900'
              }`}
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{tab.badge}</span>
              )}
            </button>
          ))}
        </div>

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8" data-testid="dashboard-tab-content">
            {stats ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Actualités', value: stats.news, icon: Newspaper, color: 'bg-blue-50 text-blue-700', onClick: () => setActiveTab('news') },
                    { label: 'Événements à venir', value: stats.events_upcoming, icon: Calendar, color: 'bg-emerald-50 text-emerald-700', onClick: () => setActiveTab('events') },
                    { label: 'Horaires de messes', value: stats.mass_times, icon: Clock, color: 'bg-amber-50 text-amber-700', onClick: () => setActiveTab('mass') },
                    { label: 'Funérailles', value: stats.funerals, icon: () => <ChristianCross className="w-6 h-6" />, color: 'bg-slate-100 text-slate-700', onClick: () => setActiveTab('funerals') },
                    { label: 'Lettres', value: stats.letters, icon: FileText, color: 'bg-purple-50 text-purple-700', onClick: () => setActiveTab('letters') },
                    { label: 'Abonnés newsletter', value: stats.subscribers, icon: Users, color: 'bg-teal-50 text-teal-700', onClick: () => setActiveTab('subscribers') },
                    { label: 'Messages reçus', value: stats.messages, icon: MessageSquare, color: 'bg-indigo-50 text-indigo-700', onClick: () => setActiveTab('messages') },
                    { label: 'Messages non lus', value: stats.messages_unread, icon: Mail, color: stats.messages_unread > 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700', onClick: () => setActiveTab('messages') },
                  ].map((stat, idx) => (
                    <button
                      key={idx}
                      onClick={stat.onClick}
                      className={`${stat.color} rounded-xl p-5 text-left transition-all hover:shadow-md hover:scale-[1.02] border border-transparent hover:border-slate-200`}
                      data-testid={`stat-card-${idx}`}
                    >
                      <stat.icon className="w-6 h-6 mb-3 opacity-70" />
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm opacity-80 font-medium">{stat.label}</p>
                    </button>
                  ))}
                </div>

                {/* Recent messages preview */}
                {contactMessages.length > 0 && (
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-serif text-xl text-slate-deep">Derniers messages</h3>
                      <button onClick={() => setActiveTab('messages')} className="text-sm text-gold hover:text-gold-dark font-medium">Voir tout</button>
                    </div>
                    <div className="space-y-3">
                      {contactMessages.slice(0, 3).map(msg => (
                        <div key={msg.id} className={`p-3 rounded-lg border ${msg.read ? 'border-slate-100 bg-white' : 'border-gold/30 bg-gold/5'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-slate-900 text-sm">{msg.name} <span className="text-slate-400 font-normal">({msg.email})</span></p>
                            {!msg.read && <span className="text-[10px] font-bold text-white bg-red-500 rounded-full px-2 py-0.5">Nouveau</span>}
                          </div>
                          <p className="text-sm font-medium text-slate-700">{msg.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="text-slate-500">Chargement des statistiques...</p>
            )}
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === 'news' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingNews ? 'Éditer l\'actualité' : 'Nouvelle actualité'}
              </h2>
              <form onSubmit={handleNewsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre</label>
                  <input
                    type="text"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    required
                    data-testid="news-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Contenu</label>
                  <ReactQuill
                    theme="snow"
                    value={newsForm.content}
                    onChange={(value) => setNewsForm({ ...newsForm, content: value })}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                      ]
                    }}
                    placeholder="Écrivez le contenu de l'actualité..."
                    data-testid="news-content-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                    <select
                      value={NEWS_CATEGORIES.includes(newsForm.category) ? newsForm.category : 'Autre'}
                      onChange={(e) => {
                        const defaultImages = Object.values(DEFAULT_CATEGORY_IMAGES);
                        const isDefaultOrEmpty = !newsForm.image_url || defaultImages.includes(newsForm.image_url);
                        if (e.target.value === 'Autre') {
                          setNewsForm({ ...newsForm, category: 'Autre', ...(isDefaultOrEmpty ? { image_url: DEFAULT_CATEGORY_IMAGES['Autre'] || '' } : {}) });
                          setCustomCategory('');
                        } else {
                          setNewsForm({ ...newsForm, category: e.target.value, ...(isDefaultOrEmpty ? { image_url: DEFAULT_CATEGORY_IMAGES[e.target.value] || '' } : {}) });
                          setCustomCategory('');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white"
                      data-testid="news-category-input"
                    >
                      {NEWS_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Autre">Autre...</option>
                    </select>
                    {(newsForm.category === 'Autre' || !NEWS_CATEGORIES.includes(newsForm.category)) && (
                      <input
                        type="text"
                        value={customCategory || (newsForm.category !== 'Autre' ? newsForm.category : '')}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder="Tapez votre catégorie..."
                        className="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                        required
                        data-testid="news-custom-category-input"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Image (optionnel)</label>
                    {newsForm.image_url ? (
                      <div className="relative border border-slate-200 rounded-lg overflow-hidden"
                        onDragOver={(e) => { e.preventDefault(); setDragOverImage(true); }}
                        onDragLeave={() => setDragOverImage(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOverImage(false);
                          const file = e.dataTransfer.files[0];
                          if (file) handleImageUpload(file);
                        }}
                      >
                        <img src={newsForm.image_url.startsWith('/api') ? `${BACKEND_URL}${newsForm.image_url}` : newsForm.image_url} alt="Preview" className="w-full h-48 object-contain bg-slate-50" />
                        {Object.values(DEFAULT_CATEGORY_IMAGES).includes(newsForm.image_url) && (
                          <span className="absolute top-2 left-2 bg-gold/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">Image par défaut</span>
                        )}
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => document.getElementById('news-image-file').click()}
                            className="bg-white shadow-md text-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-slate-50 text-xs font-medium border border-slate-200"
                            title="Changer l'image"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Modifier</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setNewsForm({ ...newsForm, image_url: '' })}
                            className="bg-red-500 shadow-md text-white rounded-lg px-3 py-1.5 flex items-center gap-1.5 hover:bg-red-600 text-xs font-medium"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Supprimer</span>
                          </button>
                        </div>
                        {dragOverImage && (
                          <div className="absolute inset-0 bg-gold/20 flex items-center justify-center">
                            <p className="text-gold font-medium text-sm bg-white/90 px-3 py-1 rounded-full">Déposer pour remplacer</p>
                          </div>
                        )}
                        <input
                          id="news-image-file"
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleImageUpload(file);
                            e.target.value = '';
                          }}
                          data-testid="news-image-input"
                        />
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                          dragOverImage ? 'border-gold bg-gold/5' : 'border-slate-200 hover:border-gold/50'
                        }`}
                        onDragOver={(e) => { e.preventDefault(); setDragOverImage(true); }}
                        onDragLeave={() => setDragOverImage(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setDragOverImage(false);
                          const file = e.dataTransfer.files[0];
                          if (file) handleImageUpload(file);
                        }}
                        onClick={() => document.getElementById('news-image-file2').click()}
                      >
                        {uploadingImage ? (
                          <div className="flex items-center justify-center gap-2 text-gold">
                            <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm">Upload en cours...</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                            <p className="text-sm text-slate-500">Glissez une image ou <span className="text-gold font-medium">parcourir</span></p>
                            <p className="text-xs text-slate-400 mt-1">JPG, PNG, WebP — max 10 Mo</p>
                          </>
                        )}
                        <input
                          id="news-image-file2"
                          type="file"
                          accept="image/jpeg,image/png,image/gif,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleImageUpload(file);
                            e.target.value = '';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="news-submit-button"
                  >
                    {editingNews ? 'Mettre à jour' : 'Publier'}
                  </button>
                  {editingNews && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNews(null);
                        setNewsForm({ title: '', content: '', category: 'Actualité', image_url: DEFAULT_CATEGORY_IMAGES['Actualité'] || '' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="news-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* News List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Actualités publiées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : news.length === 0 ? (
                <p className="text-slate-500">Aucune actualité</p>
              ) : (
                <>
                <BulkBar selected={selectedNews} setSelected={setSelectedNews} items={news} endpoint="news" label="actualités" />
                {news.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border flex justify-between items-start ${selectedNews.includes(item.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`}
                    data-testid={`news-item-${item.id}`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={selectedNews.includes(item.id)}
                        onChange={() => toggleSelect(item.id, selectedNews, setSelectedNews)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="font-medium text-slate-900 mb-1 truncate">{item.title}</h4>
                        <p className="text-sm text-slate-600 mb-2 line-clamp-2 overflow-hidden" style={{ wordBreak: 'break-word' }}>{(() => { const tmp = document.createElement('div'); tmp.innerHTML = item.content; return (tmp.textContent || '').replace(/\u00A0/g, ' '); })()}</p>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <span>{formatDate(item.created_at)}</span>
                          <span>•</span>
                          <span className="text-gold">{item.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditNews(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`news-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`news-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MASS TIMES TAB */}
        {activeTab === 'mass' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingMass ? 'Éditer l\'horaire' : 'Nouvel horaire'}
              </h2>
              <form onSubmit={handleMassSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                    <input
                      type="date"
                      value={massForm.date || ''}
                      onChange={(e) => setMassForm({ ...massForm, date: e.target.value, day: getDayName(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-date-input"
                    />
                    {massForm.date && (
                      <p className="text-xs text-gold mt-1 font-medium">{getDayName(massForm.date)}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure</label>
                    <input
                      type="time"
                      value={massForm.time}
                      onChange={(e) => setMassForm({ ...massForm, time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      required
                      data-testid="mass-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu</label>
                    <LocationAutocomplete
                      value={massForm.location}
                      onChange={(val) => setMassForm({ ...massForm, location: val })}
                      placeholder="Tapez pour rechercher une église..."
                      required
                      testId="mass-location-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                    <select
                      value={MASS_TYPES.includes(massForm.mass_type) ? massForm.mass_type : 'Autre'}
                      onChange={(e) => {
                        if (e.target.value === 'Autre') {
                          setMassForm({ ...massForm, mass_type: 'Autre' });
                          setCustomMassType('');
                        } else {
                          setMassForm({ ...massForm, mass_type: e.target.value });
                          setCustomMassType('');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white"
                      data-testid="mass-type-input"
                    >
                      {MASS_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                      <option value="Autre">Autre...</option>
                    </select>
                    {(massForm.mass_type === 'Autre' || !MASS_TYPES.includes(massForm.mass_type)) && (
                      <input
                        type="text"
                        value={customMassType || (massForm.mass_type !== 'Autre' ? massForm.mass_type : '')}
                        onChange={(e) => setCustomMassType(e.target.value)}
                        placeholder="Tapez le type..."
                        className="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                        required
                      />
                    )}
                  </div>
                </div>

                {/* Repeat section - only when creating */}
                {!editingMass && (
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Repeat className="w-4 h-4 text-slate-600" />
                      <label className="text-sm font-medium text-slate-700">Répéter cet horaire</label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-slate-500 mb-1">Fréquence</label>
                        <select
                          value={repeatMode}
                          onChange={(e) => setRepeatMode(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold bg-white text-sm"
                        >
                          <option value="none">Pas de répétition</option>
                          <option value="week">Toutes les semaines</option>
                          <option value="2weeks">Toutes les 2 semaines</option>
                          <option value="month">Tous les mois</option>
                        </select>
                      </div>
                      {repeatMode !== 'none' && (
                        <div>
                          <label className="block text-xs text-slate-500 mb-1">Jusqu'au</label>
                          <input
                            type="date"
                            value={repeatUntil}
                            onChange={(e) => setRepeatUntil(e.target.value)}
                            min={massForm.date}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold text-sm"
                            required={repeatMode !== 'none'}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="mass-submit-button"
                  >
                    {editingMass ? 'Mettre à jour' : (repeatMode !== 'none' ? 'Créer la série' : 'Ajouter')}
                  </button>
                  {editingMass && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingMass(null);
                        setMassForm({ day: getInitialDay(todayStr), time: '10:00', location: '', mass_type: 'Messe Dominicale', date: todayStr });
                        setRepeatMode('none');
                        setRepeatUntil('');
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="mass-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Mass Times List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Horaires configurés</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : massTimes.length === 0 ? (
                <p className="text-slate-500">Aucun horaire</p>
              ) : (
                <>
                <BulkBar selected={selectedMass} setSelected={setSelectedMass} items={massTimes} endpoint="mass-times" label="horaires" />
                {massTimes.map((item, idx) => {
                  const prevDate = idx > 0 ? massTimes[idx - 1].date : null;
                  const showDateHeader = item.date && item.date !== prevDate;
                  return (
                  <div key={item.id}>
                    {showDateHeader && (
                      <div className={`flex items-center gap-3 ${idx > 0 ? 'mt-6' : ''} mb-2`}>
                        <div className="h-px flex-1 bg-slate-200"></div>
                        <span className="text-xs font-semibold text-gold uppercase tracking-wider">
                          {new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <div className="h-px flex-1 bg-slate-200"></div>
                      </div>
                    )}
                  <div
                    className={`bg-white rounded-lg p-4 border flex justify-between items-center ${selectedMass.includes(item.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`}
                    data-testid={`mass-item-${item.id}`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedMass.includes(item.id)}
                        onChange={() => toggleSelect(item.id, selectedMass, setSelectedMass)}
                        className="w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {item.day} - {item.time}
                          {item.date && <span className="text-slate-400 text-sm ml-2">({new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')})</span>}
                        </h4>
                        <p className="text-sm text-slate-600 truncate">{item.location} • {item.mass_type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleDuplicateMass(item)}
                        className="text-slate-600 hover:text-emerald-600 transition-colors"
                        title="Dupliquer"
                        data-testid={`mass-duplicate-${item.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditMass(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`mass-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteMass(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`mass-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  </div>
                  );
                })}
                </>
              )}
            </div>
          </div>
        )}

        {/* FUNERALS TAB */}
        {activeTab === 'funerals' && (
          <div className="space-y-8">
            {/* Form */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-serif text-xl text-slate-deep mb-6">
                {editingFuneral ? 'Modifier la cérémonie' : 'Ajouter une cérémonie'}
              </h3>
              <form onSubmit={handleSubmitFuneral} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Nom du défunt *</label>
                    <input
                      type="text"
                      required
                      value={funeralForm.deceased_name}
                      onChange={(e) => setFuneralForm({ ...funeralForm, deceased_name: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                      placeholder="M. Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu *</label>
                    <LocationAutocomplete
                      value={funeralForm.location}
                      onChange={(val) => setFuneralForm({ ...funeralForm, location: val })}
                      placeholder="Tapez pour rechercher une église..."
                      required
                      testId="funeral-location-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={funeralForm.funeral_date}
                      onChange={(e) => setFuneralForm({ ...funeralForm, funeral_date: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure *</label>
                    <input
                      type="time"
                      required
                      value={funeralForm.funeral_time}
                      onChange={(e) => setFuneralForm({ ...funeralForm, funeral_time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Type de cérémonie</label>
                    <select
                      value={CEREMONY_TYPES.includes(funeralForm.ceremony_type) ? funeralForm.ceremony_type : 'Autre'}
                      onChange={(e) => {
                        if (e.target.value === 'Autre') {
                          setFuneralForm({ ...funeralForm, ceremony_type: 'Autre' });
                          setCustomCeremonyType('');
                        } else {
                          setFuneralForm({ ...funeralForm, ceremony_type: e.target.value });
                          setCustomCeremonyType('');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                    >
                      {CEREMONY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                      <option value="Autre">Autre...</option>
                    </select>
                    {(funeralForm.ceremony_type === 'Autre' || !CEREMONY_TYPES.includes(funeralForm.ceremony_type)) && (
                      <input
                        type="text"
                        value={customCeremonyType || (funeralForm.ceremony_type !== 'Autre' ? funeralForm.ceremony_type : '')}
                        onChange={(e) => setCustomCeremonyType(e.target.value)}
                        placeholder="Tapez le type de cérémonie..."
                        className="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                        required
                      />
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingFuneral ? 'Modifier' : 'Ajouter'}</span>
                  </button>
                  {editingFuneral && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFuneral(null);
                        setFuneralForm({ deceased_name: '', funeral_date: '', funeral_time: '', location: '', ceremony_type: 'Messe de funérailles' });
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Funerals List */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Cérémonies programmées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : funerals.length === 0 ? (
                <p className="text-slate-500">Aucune cérémonie</p>
              ) : (
                <>
                <BulkBar selected={selectedFunerals} setSelected={setSelectedFunerals} items={funerals} endpoint="funerals" label="funérailles" />
                {funerals.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border flex justify-between items-center ${selectedFunerals.includes(item.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`}
                    data-testid={`funeral-item-${item.id}`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedFunerals.includes(item.id)}
                        onChange={() => toggleSelect(item.id, selectedFunerals, setSelectedFunerals)}
                        className="w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">{item.deceased_name}</h4>
                        <p className="text-sm text-slate-600 truncate">
                          {new Date(item.funeral_date).toLocaleDateString('fr-FR')} à {item.funeral_time} • {item.location}
                        </p>
                        <p className="text-xs text-gold mt-1">{item.ceremony_type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditFuneral(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`funeral-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFuneral(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`funeral-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingEvent ? "Modifier l'événement" : 'Nouvel événement'}
              </h2>
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    required
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Ex: Messe de Noël"
                    data-testid="event-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <ReactQuill
                    theme="snow"
                    value={eventForm.description}
                    onChange={(value) => setEventForm({ ...eventForm, description: value })}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                      ]
                    }}
                    placeholder="Détails de l'événement..."
                    data-testid="event-description-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-date-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure de début *</label>
                    <input
                      type="time"
                      required
                      value={eventForm.time}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Heure de fin (optionnel)</label>
                    <input
                      type="time"
                      value={eventForm.end_time}
                      onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-end-time-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Lieu *</label>
                    <LocationAutocomplete
                      value={eventForm.location}
                      onChange={(val) => setEventForm({ ...eventForm, location: val })}
                      placeholder="Tapez pour rechercher un lieu..."
                      required
                      testId="event-location-input"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Catégorie</label>
                    <select
                      value={EVENT_CATEGORIES.includes(eventForm.category) ? eventForm.category : 'Autre'}
                      onChange={(e) => {
                        if (e.target.value === 'Autre') {
                          setEventForm({ ...eventForm, category: 'Autre' });
                          setCustomEventCategory('');
                        } else {
                          setEventForm({ ...eventForm, category: e.target.value });
                          setCustomEventCategory('');
                        }
                      }}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                      data-testid="event-category-select"
                    >
                      {EVENT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="Autre">Autre...</option>
                    </select>
                    {(eventForm.category === 'Autre' || !EVENT_CATEGORIES.includes(eventForm.category)) && (
                      <input
                        type="text"
                        value={customEventCategory || (eventForm.category !== 'Autre' ? eventForm.category : '')}
                        onChange={(e) => setCustomEventCategory(e.target.value)}
                        placeholder="Tapez la catégorie..."
                        className="w-full mt-2 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                        required
                      />
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    data-testid="event-submit-button"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingEvent ? 'Mettre à jour' : 'Ajouter'}</span>
                  </button>
                  {editingEvent && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEvent(null);
                        setEventForm({ title: '', description: '', date: '', time: '', end_time: '', location: '', category: 'Communauté' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="event-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Tous les événements</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : events.length === 0 ? (
                <p className="text-slate-500">Aucun événement</p>
              ) : (
                <>
                <BulkBar selected={selectedEvents} setSelected={setSelectedEvents} items={events} endpoint="events" label="événements" />
                {events.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border flex justify-between items-start ${selectedEvents.includes(item.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`}
                    data-testid={`event-item-${item.id}`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes(item.id)}
                        onChange={() => toggleSelect(item.id, selectedEvents, setSelectedEvents)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900 truncate">{item.title}</h4>
                          <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full flex-shrink-0">{item.category}</span>
                        </div>
                        {item.description && <p className="text-sm text-slate-600 mb-1 line-clamp-2 overflow-hidden" style={{ wordBreak: 'break-word' }}>{(() => { const tmp = document.createElement('div'); tmp.innerHTML = item.description; return (tmp.textContent || '').replace(/\u00A0/g, ' '); })()}</p>}
                        <p className="text-sm text-slate-500 truncate">
                          {new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')} à {item.time}
                          {item.end_time ? ` - ${item.end_time}` : ''} • {item.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4 flex-shrink-0">
                      <button
                        onClick={() => handleEditEvent(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`event-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`event-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* LETTERS TAB */}
        {activeTab === 'letters' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-serif text-2xl text-slate-deep mb-6">
                {editingLetter ? 'Modifier la lettre' : 'Nouvelle lettre'}
              </h2>
              <form onSubmit={handleLetterSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    required
                    value={letterForm.title}
                    onChange={(e) => setLetterForm({ ...letterForm, title: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    placeholder="Ex: Carême 2026 - Lettre aux paroissiens"
                    data-testid="letter-title-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date *</label>
                  <input
                    type="date"
                    required
                    value={letterForm.date}
                    onChange={(e) => setLetterForm({ ...letterForm, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold"
                    data-testid="letter-date-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Fichier PDF *</label>
                  {letterForm.file_url ? (
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <FileText className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-emerald-800 truncate">Fichier PDF uploadé</p>
                        <a
                          href={letterForm.file_url.startsWith('/api') ? `${BACKEND_URL}${letterForm.file_url}` : letterForm.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-emerald-600 hover:underline"
                        >
                          Voir le fichier
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLetterForm({ ...letterForm, file_url: '' })}
                        className="text-red-500 hover:text-red-700 flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                        dragOverFile ? 'border-gold bg-gold/5' : 'border-slate-200 hover:border-gold/50'
                      }`}
                      onDragOver={(e) => { e.preventDefault(); setDragOverFile(true); }}
                      onDragLeave={() => setDragOverFile(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setDragOverFile(false);
                        const file = e.dataTransfer.files[0];
                        if (file) handleLetterFileUpload(file);
                      }}
                      onClick={() => document.getElementById('letter-pdf-file').click()}
                    >
                      {uploadingFile ? (
                        <div className="flex items-center justify-center gap-2 text-gold">
                          <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Upload en cours...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">Glissez un fichier PDF ou <span className="text-gold font-medium">parcourir</span></p>
                          <p className="text-xs text-slate-400 mt-1">PDF uniquement — max 10 Mo</p>
                        </>
                      )}
                      <input
                        id="letter-pdf-file"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) handleLetterFileUpload(file);
                          e.target.value = '';
                        }}
                        data-testid="letter-file-input"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description (optionnel)</label>
                  <ReactQuill
                    theme="snow"
                    value={letterForm.content}
                    onChange={(value) => setLetterForm({ ...letterForm, content: value })}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['link'],
                        ['clean']
                      ]
                    }}
                    placeholder="Brève description de la lettre..."
                    data-testid="letter-content-input"
                  />
                </div>
                <div className="flex space-x-4 pt-2">
                  <button
                    type="submit"
                    disabled={!letterForm.file_url}
                    className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="letter-submit-button"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingLetter ? 'Mettre à jour' : 'Publier'}</span>
                  </button>
                  {editingLetter && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLetter(null);
                        setLetterForm({ title: '', content: '', date: '', file_url: '' });
                      }}
                      className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium transition-colors"
                      data-testid="letter-cancel-button"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-xl text-slate-deep">Lettres publiées</h3>
              {loading ? (
                <p>Chargement...</p>
              ) : letters.length === 0 ? (
                <p className="text-slate-500">Aucune lettre publiée</p>
              ) : (
                <>
                <BulkBar selected={selectedLetters} setSelected={setSelectedLetters} items={letters} endpoint="letters" label="lettres" />
                {letters.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg p-4 border flex justify-between items-start ${selectedLetters.includes(item.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`}
                    data-testid={`letter-item-${item.id}`}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedLetters.includes(item.id)}
                        onChange={() => toggleSelect(item.id, selectedLetters, setSelectedLetters)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{item.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">
                          {new Date(item.date + 'T00:00:00').toLocaleDateString('fr-FR')}
                        </p>
                        {item.file_url && (
                          <a
                            href={item.file_url.startsWith('/api') ? `${BACKEND_URL}${item.file_url}` : item.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-dark mt-1"
                          >
                            <FileText className="w-3 h-3" />
                            Voir le PDF
                          </a>
                        )}
                        {item.content && <p className="text-sm text-slate-600 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: item.content }}></p>}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditLetter(item)}
                        className="text-slate-600 hover:text-gold transition-colors"
                        data-testid={`letter-edit-${item.id}`}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLetter(item.id)}
                        className="text-slate-600 hover:text-red-600 transition-colors"
                        data-testid={`letter-delete-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <div className="space-y-4" data-testid="messages-tab-content">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-slate-deep">Messages de contact</h3>
              <span className="text-sm text-slate-500">{contactMessages.length} message(s)</span>
            </div>
            {loading ? (
              <p>Chargement...</p>
            ) : contactMessages.length === 0 ? (
              <p className="text-slate-500">Aucun message reçu</p>
            ) : (
              <div className="space-y-3">
                {contactMessages.map(msg => (
                  <div key={msg.id} className={`bg-white rounded-lg p-5 border transition-colors ${msg.read ? 'border-slate-100' : 'border-gold/40 bg-gold/5'}`} data-testid={`message-item-${msg.id}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="font-medium text-slate-900">{msg.name}</p>
                          {!msg.read && <span className="text-[10px] font-bold text-white bg-red-500 rounded-full px-2 py-0.5">Nouveau</span>}
                        </div>
                        <p className="text-sm text-gold mb-1">{msg.email}</p>
                        <p className="text-sm font-semibold text-slate-800 mb-2">{msg.subject}</p>
                        <p className="text-sm text-slate-600 whitespace-pre-wrap" style={{ wordBreak: 'break-word' }}>{msg.message}</p>
                        <p className="text-xs text-slate-400 mt-3">{formatDate(msg.created_at)}</p>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkMessageRead(msg.id)}
                            className="text-slate-500 hover:text-emerald-600 transition-colors"
                            title="Marquer comme lu"
                            data-testid={`message-read-${msg.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="text-slate-500 hover:text-red-600 transition-colors"
                          title="Supprimer"
                          data-testid={`message-delete-${msg.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SUBSCRIBERS TAB */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4" data-testid="subscribers-tab-content">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="font-serif text-xl text-slate-deep">Abonnés newsletter</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">{subscribers.length} abonné(s)</span>
                {subscribers.length > 0 && (
                  <button
                    onClick={exportSubscribersCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm rounded-lg font-medium transition-colors"
                    data-testid="export-csv-button"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export CSV
                  </button>
                )}
              </div>
            </div>
            {loading ? (
              <p>Chargement...</p>
            ) : subscribers.length === 0 ? (
              <p className="text-slate-500">Aucun abonné</p>
            ) : (
              <>
                <BulkBar selected={selectedSubscribers} setSelected={setSelectedSubscribers} items={subscribers} endpoint="subscribers" label="abonnés" />
                {subscribers.map(sub => (
                  <div key={sub.id} className={`bg-white rounded-lg p-4 border flex justify-between items-center ${selectedSubscribers.includes(sub.id) ? 'border-gold bg-gold/5' : 'border-slate-100'}`} data-testid={`subscriber-item-${sub.id}`}>
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(sub.id)}
                        onChange={() => toggleSelect(sub.id, selectedSubscribers, setSelectedSubscribers)}
                        className="w-4 h-4 rounded border-slate-300 text-gold focus:ring-gold flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{sub.email}</p>
                        <p className="text-xs text-slate-500">{formatDate(sub.subscribed_at)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSubscriber(sub.id)}
                      className="text-slate-500 hover:text-red-600 transition-colors ml-4 flex-shrink-0"
                      data-testid={`subscriber-delete-${sub.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;