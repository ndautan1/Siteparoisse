import requests
import sys
from datetime import datetime
import json

class ParishAPITester:
    def __init__(self, base_url="https://faith-community-115.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}" if endpoint else f"{self.base_url}/api"
        headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if method == 'GET':
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list):
                            print(f"   📊 Returned {len(response_data)} items")
                        elif isinstance(response_data, dict) and 'message' in response_data:
                            print(f"   📨 Message: {response_data['message']}")
                    except:
                        pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   ⚠️ Error: {error_data}")
                except:
                    print(f"   ⚠️ Response text: {response.text[:100]}")

            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "url": url
            })

            return success, response.json() if success and response.content else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.test_results.append({
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e),
                "url": url
            })
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test("API Root", "GET", "", 200)
        return success

    def test_health_check(self):
        """Test health check endpoint"""
        print("\n🏥 Testing Health Check Endpoint...")
        success, response = self.run_test("Health Check", "GET", "health", 200)
        
        if success:
            # Verify expected structure and content
            expected_fields = ["status", "database", "service"]
            missing_fields = [field for field in expected_fields if field not in response]
            
            if missing_fields:
                print(f"   ⚠️ Missing fields: {missing_fields}")
                return False
            
            # Check specific values
            status_ok = response.get("status") == "healthy"
            db_ok = response.get("database") in ["connected", "disconnected"]  # Both are acceptable
            service_ok = response.get("service") == "notre-dame-autan-api"
            
            print(f"   📊 Status: {response.get('status')} {'✅' if status_ok else '❌'}")
            print(f"   🗄️  Database: {response.get('database')} {'✅' if db_ok else '❌'}")
            print(f"   🔧 Service: {response.get('service')} {'✅' if service_ok else '❌'}")
            
            return status_ok and db_ok and service_ok
        
        return success

    def test_login(self, username="admin", password="admin123"):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"username": username, "password": password}
        )
        if success and 'token' in response:
            self.token = response['token']
            print(f"   🔑 Token received: {self.token[:20]}...")
            return True
        return False

    def test_get_news(self):
        """Test getting news"""
        # Test getting all news
        success1, response1 = self.run_test("Get All News", "GET", "news", 200)
        
        # Test getting published news only
        success2, response2 = self.run_test("Get Published News", "GET", "news?published_only=true", 200)
        
        return success1 and success2

    def test_get_mass_times(self):
        """Test getting mass times"""
        success, response = self.run_test("Get Mass Times", "GET", "mass-times", 200)
        return success

    def test_create_news(self):
        """Test creating news (requires auth)"""
        if not self.token:
            print("❌ No token available for authenticated test")
            return False
            
        test_news = {
            "title": "Test Actualité",
            "content": "Contenu de test pour l'actualité",
            "category": "Test",
            "image_url": "https://example.com/test.jpg"
        }
        
        success, response = self.run_test(
            "Create News",
            "POST",
            "news",
            200,  # FastAPI typically returns 200 for successful POST, not 201
            data=test_news
        )
        
        if success and 'id' in response:
            self.test_news_id = response['id']
            print(f"   📄 Created news with ID: {self.test_news_id}")
            return True
        return False

    def test_update_news(self):
        """Test updating news (requires auth and created news)"""
        if not self.token or not hasattr(self, 'test_news_id'):
            print("❌ No token or news ID available for update test")
            return False
            
        update_data = {
            "title": "Test Actualité Modifiée",
            "content": "Contenu modifié"
        }
        
        success, response = self.run_test(
            "Update News",
            "PUT",
            f"news/{self.test_news_id}",
            200,
            data=update_data
        )
        return success

    def test_delete_news(self):
        """Test deleting news (requires auth and created news)"""
        if not self.token or not hasattr(self, 'test_news_id'):
            print("❌ No token or news ID available for delete test")
            return False
            
        success, response = self.run_test(
            "Delete News",
            "DELETE",
            f"news/{self.test_news_id}",
            200
        )
        return success

    def test_create_mass_time(self):
        """Test creating mass time (requires auth)"""
        if not self.token:
            print("❌ No token available for authenticated test")
            return False
            
        test_mass = {
            "day": "Test Jour",
            "time": "10h30",
            "location": "Église Test",
            "mass_type": "Messe Test"
        }
        
        success, response = self.run_test(
            "Create Mass Time",
            "POST",
            "mass-times",
            200,
            data=test_mass
        )
        
        if success and 'id' in response:
            self.test_mass_id = response['id']
            print(f"   ⏰ Created mass time with ID: {self.test_mass_id}")
            return True
        return False

    def test_update_mass_time(self):
        """Test updating mass time (requires auth and created mass time)"""
        if not self.token or not hasattr(self, 'test_mass_id'):
            print("❌ No token or mass time ID available for update test")
            return False
            
        update_data = {
            "day": "Test Jour Modifié",
            "time": "11h00"
        }
        
        success, response = self.run_test(
            "Update Mass Time",
            "PUT",
            f"mass-times/{self.test_mass_id}",
            200,
            data=update_data
        )
        return success

    def test_delete_mass_time(self):
        """Test deleting mass time (requires auth and created mass time)"""
        if not self.token or not hasattr(self, 'test_mass_id'):
            print("❌ No token or mass time ID available for delete test")
            return False
            
        success, response = self.run_test(
            "Delete Mass Time",
            "DELETE",
            f"mass-times/{self.test_mass_id}",
            200
        )
        return success

    def test_unauthorized_access(self):
        """Test unauthorized access to protected endpoints"""
        # Temporarily remove token
        original_token = self.token
        self.token = None
        
        print("\n🔒 Testing unauthorized access...")
        
        success1, _ = self.run_test("Unauthorized Create News", "POST", "news", 401, data={"title": "test", "content": "test"})
        success2, _ = self.run_test("Unauthorized Create Mass", "POST", "mass-times", 401, data={"day": "test", "time": "test", "location": "test"})
        
        # Restore token
        self.token = original_token
        
        return success1 and success2

def main():
    """Run all API tests"""
    print("🏛️ Starting Parish API Testing...")
    print("=" * 50)
    
    tester = ParishAPITester()
    
    # Basic tests (no auth required)
    print("\n📍 BASIC API TESTS")
    tester.test_root_endpoint()
    tester.test_health_check()
    tester.test_get_news()
    tester.test_get_mass_times()
    
    # Authentication test
    print("\n🔐 AUTHENTICATION TESTS")
    if not tester.test_login():
        print("❌ Login failed, skipping authenticated tests")
        return 1
    
    # Test unauthorized access
    tester.test_unauthorized_access()
    
    # CRUD tests (require auth)
    print("\n📰 NEWS CRUD TESTS")
    tester.test_create_news()
    tester.test_update_news()
    tester.test_delete_news()
    
    print("\n⏰ MASS TIMES CRUD TESTS")
    tester.test_create_mass_time()
    tester.test_update_mass_time()
    tester.test_delete_mass_time()
    
    # Results summary
    print("\n" + "=" * 50)
    print(f"📊 FINAL RESULTS")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print failed tests
    failed_tests = [t for t in tester.test_results if not t['success']]
    if failed_tests:
        print(f"\n❌ FAILED TESTS ({len(failed_tests)}):")
        for test in failed_tests:
            error_msg = test.get('error', f'Status {test["actual_status"]}')
            print(f"   • {test['name']}: {error_msg}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())