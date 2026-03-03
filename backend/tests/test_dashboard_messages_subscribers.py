"""
Test Dashboard, Messages, and Subscribers API endpoints for Notre Dame d'Autan CMS.

Covers:
- GET /api/stats - Dashboard statistics
- PUT /api/contact/{id}/read - Mark message as read
- DELETE /api/contact/{id} - Delete contact message
- DELETE /api/subscribers/{id} - Delete subscriber
- POST /api/subscribers/bulk-delete - Bulk delete subscribers
"""

import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestAuth:
    """Authentication setup tests"""
    
    def test_login_success(self):
        """Test login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "username": "test",
            "password": "test"
        })
        assert response.status_code == 200, f"Login failed: {response.text}"
        data = response.json()
        assert "token" in data
        assert "username" in data
        print(f"✅ Login successful, got token")
        return data["token"]


@pytest.fixture(scope="module")
def auth_token():
    """Get authentication token for tests"""
    response = requests.post(f"{BASE_URL}/api/auth/login", json={
        "username": "test",
        "password": "test"
    })
    if response.status_code == 200:
        return response.json().get("token")
    pytest.skip("Authentication failed - skipping authenticated tests")


@pytest.fixture
def auth_headers(auth_token):
    """Return headers with auth token"""
    return {"Authorization": f"Bearer {auth_token}"}


class TestDashboardStats:
    """Dashboard statistics endpoint tests"""
    
    def test_stats_requires_auth(self):
        """GET /api/stats requires authentication"""
        response = requests.get(f"{BASE_URL}/api/stats")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ GET /api/stats requires auth (401/403 without token)")
    
    def test_stats_returns_all_counts(self, auth_headers):
        """GET /api/stats returns all expected statistics"""
        response = requests.get(f"{BASE_URL}/api/stats", headers=auth_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        data = response.json()
        
        # Check all expected fields exist
        expected_fields = [
            "news", "events_total", "events_upcoming", "mass_times",
            "funerals", "letters", "subscribers", "messages", "messages_unread"
        ]
        for field in expected_fields:
            assert field in data, f"Missing field: {field}"
            assert isinstance(data[field], int), f"Field {field} should be integer"
        
        print(f"✅ GET /api/stats returns all counts:")
        print(f"   - news: {data['news']}")
        print(f"   - events_upcoming: {data['events_upcoming']}")
        print(f"   - mass_times: {data['mass_times']}")
        print(f"   - funerals: {data['funerals']}")
        print(f"   - letters: {data['letters']}")
        print(f"   - subscribers: {data['subscribers']}")
        print(f"   - messages: {data['messages']}")
        print(f"   - messages_unread: {data['messages_unread']}")


class TestContactMessages:
    """Contact message management tests"""
    
    @pytest.fixture
    def test_message(self, auth_headers):
        """Create a test message for testing"""
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST Subject",
            "message": "This is a test message for API testing"
        })
        assert response.status_code == 200, f"Failed to create test message: {response.text}"
        message = response.json()
        print(f"✅ Created test message with id: {message['id']}")
        yield message
        # Cleanup
        requests.delete(f"{BASE_URL}/api/contact/{message['id']}", headers=auth_headers)
    
    def test_get_contact_messages_requires_auth(self):
        """GET /api/contact requires authentication"""
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ GET /api/contact requires auth")
    
    def test_get_contact_messages(self, auth_headers):
        """GET /api/contact returns list of messages"""
        response = requests.get(f"{BASE_URL}/api/contact", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ GET /api/contact returns {len(data)} messages")
    
    def test_mark_message_read_requires_auth(self, test_message):
        """PUT /api/contact/{id}/read requires authentication"""
        response = requests.put(f"{BASE_URL}/api/contact/{test_message['id']}/read")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ PUT /api/contact/{id}/read requires auth")
    
    def test_mark_message_read(self, auth_headers, test_message):
        """PUT /api/contact/{id}/read marks message as read"""
        message_id = test_message['id']
        
        # Mark as read
        response = requests.put(f"{BASE_URL}/api/contact/{message_id}/read", 
                               headers=auth_headers)
        assert response.status_code == 200, f"Failed: {response.text}"
        
        # Verify message is now read
        get_response = requests.get(f"{BASE_URL}/api/contact", headers=auth_headers)
        messages = get_response.json()
        target_msg = next((m for m in messages if m['id'] == message_id), None)
        assert target_msg is not None, "Message not found after marking as read"
        assert target_msg['read'] == True, "Message should be marked as read"
        print(f"✅ PUT /api/contact/{message_id}/read marks message as read")
    
    def test_mark_nonexistent_message_read_returns_404(self, auth_headers):
        """PUT /api/contact/{fake_id}/read returns 404"""
        fake_id = str(uuid.uuid4())
        response = requests.put(f"{BASE_URL}/api/contact/{fake_id}/read", 
                               headers=auth_headers)
        assert response.status_code == 404
        print("✅ PUT /api/contact/{fake_id}/read returns 404")
    
    def test_delete_message_requires_auth(self, test_message):
        """DELETE /api/contact/{id} requires authentication"""
        response = requests.delete(f"{BASE_URL}/api/contact/{test_message['id']}")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ DELETE /api/contact/{id} requires auth")
    
    def test_delete_message(self, auth_headers):
        """DELETE /api/contact/{id} deletes message"""
        # Create a message to delete
        create_response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_DeleteUser",
            "email": "delete_test@example.com",
            "subject": "To be deleted",
            "message": "This message will be deleted"
        })
        assert create_response.status_code == 200
        message_id = create_response.json()['id']
        
        # Delete the message
        delete_response = requests.delete(f"{BASE_URL}/api/contact/{message_id}", 
                                          headers=auth_headers)
        assert delete_response.status_code == 200, f"Failed: {delete_response.text}"
        
        # Verify message is gone
        get_response = requests.get(f"{BASE_URL}/api/contact", headers=auth_headers)
        messages = get_response.json()
        assert not any(m['id'] == message_id for m in messages)
        print(f"✅ DELETE /api/contact/{message_id} deletes message and verified removal")
    
    def test_delete_nonexistent_message_returns_404(self, auth_headers):
        """DELETE /api/contact/{fake_id} returns 404"""
        fake_id = str(uuid.uuid4())
        response = requests.delete(f"{BASE_URL}/api/contact/{fake_id}", 
                                   headers=auth_headers)
        assert response.status_code == 404
        print("✅ DELETE /api/contact/{fake_id} returns 404")


class TestSubscribers:
    """Subscriber management tests"""
    
    @pytest.fixture
    def test_subscriber(self, auth_headers):
        """Create a test subscriber for testing"""
        unique_email = f"test_sub_{uuid.uuid4().hex[:8]}@example.com"
        response = requests.post(f"{BASE_URL}/api/subscribers", json={
            "email": unique_email
        })
        assert response.status_code == 200, f"Failed to create subscriber: {response.text}"
        subscriber = response.json()
        print(f"✅ Created test subscriber: {unique_email}")
        yield subscriber
        # Cleanup
        requests.delete(f"{BASE_URL}/api/subscribers/{subscriber['id']}", headers=auth_headers)
    
    def test_get_subscribers_requires_auth(self):
        """GET /api/subscribers requires authentication"""
        response = requests.get(f"{BASE_URL}/api/subscribers")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ GET /api/subscribers requires auth")
    
    def test_get_subscribers(self, auth_headers):
        """GET /api/subscribers returns list of subscribers"""
        response = requests.get(f"{BASE_URL}/api/subscribers", headers=auth_headers)
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            assert "id" in data[0]
            assert "email" in data[0]
            assert "subscribed_at" in data[0]
        print(f"✅ GET /api/subscribers returns {len(data)} subscribers")
    
    def test_delete_subscriber_requires_auth(self, test_subscriber):
        """DELETE /api/subscribers/{id} requires authentication"""
        response = requests.delete(f"{BASE_URL}/api/subscribers/{test_subscriber['id']}")
        assert response.status_code == 403 or response.status_code == 401
        print("✅ DELETE /api/subscribers/{id} requires auth")
    
    def test_delete_subscriber(self, auth_headers):
        """DELETE /api/subscribers/{id} deletes subscriber"""
        # Create a subscriber to delete
        unique_email = f"delete_sub_{uuid.uuid4().hex[:8]}@example.com"
        create_response = requests.post(f"{BASE_URL}/api/subscribers", json={
            "email": unique_email
        })
        assert create_response.status_code == 200
        subscriber_id = create_response.json()['id']
        
        # Delete the subscriber
        delete_response = requests.delete(f"{BASE_URL}/api/subscribers/{subscriber_id}", 
                                          headers=auth_headers)
        assert delete_response.status_code == 200, f"Failed: {delete_response.text}"
        
        # Verify subscriber is gone
        get_response = requests.get(f"{BASE_URL}/api/subscribers", headers=auth_headers)
        subscribers = get_response.json()
        assert not any(s['id'] == subscriber_id for s in subscribers)
        print(f"✅ DELETE /api/subscribers/{subscriber_id} deletes subscriber and verified removal")
    
    def test_delete_nonexistent_subscriber_returns_404(self, auth_headers):
        """DELETE /api/subscribers/{fake_id} returns 404"""
        fake_id = str(uuid.uuid4())
        response = requests.delete(f"{BASE_URL}/api/subscribers/{fake_id}", 
                                   headers=auth_headers)
        assert response.status_code == 404
        print("✅ DELETE /api/subscribers/{fake_id} returns 404")
    
    def test_bulk_delete_subscribers_requires_auth(self):
        """POST /api/subscribers/bulk-delete requires authentication"""
        response = requests.post(f"{BASE_URL}/api/subscribers/bulk-delete", 
                                json={"ids": []})
        assert response.status_code == 403 or response.status_code == 401
        print("✅ POST /api/subscribers/bulk-delete requires auth")
    
    def test_bulk_delete_subscribers(self, auth_headers):
        """POST /api/subscribers/bulk-delete deletes multiple subscribers"""
        # Create 2 test subscribers
        sub_ids = []
        for i in range(2):
            unique_email = f"bulk_delete_{uuid.uuid4().hex[:8]}@example.com"
            response = requests.post(f"{BASE_URL}/api/subscribers", json={"email": unique_email})
            assert response.status_code == 200
            sub_ids.append(response.json()['id'])
        
        # Bulk delete
        delete_response = requests.post(f"{BASE_URL}/api/subscribers/bulk-delete",
                                        json={"ids": sub_ids},
                                        headers=auth_headers)
        assert delete_response.status_code == 200, f"Failed: {delete_response.text}"
        data = delete_response.json()
        assert "deleted" in data
        assert data["deleted"] == 2
        
        # Verify subscribers are gone
        get_response = requests.get(f"{BASE_URL}/api/subscribers", headers=auth_headers)
        subscribers = get_response.json()
        for sid in sub_ids:
            assert not any(s['id'] == sid for s in subscribers)
        print(f"✅ POST /api/subscribers/bulk-delete deleted 2 subscribers and verified removal")


class TestUnreadMessagesCount:
    """Test unread messages count is correctly calculated"""
    
    def test_unread_count_decreases_when_marked_read(self, auth_headers):
        """Verify unread count decreases when message is marked as read"""
        # Get initial stats
        stats_before = requests.get(f"{BASE_URL}/api/stats", headers=auth_headers).json()
        initial_unread = stats_before['messages_unread']
        
        # Create a new unread message
        create_response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_UnreadCount",
            "email": "unread_count@example.com",
            "subject": "Unread count test",
            "message": "Testing unread count"
        })
        assert create_response.status_code == 200
        message_id = create_response.json()['id']
        
        # Verify count increased
        stats_after_create = requests.get(f"{BASE_URL}/api/stats", headers=auth_headers).json()
        assert stats_after_create['messages_unread'] == initial_unread + 1
        
        # Mark as read
        requests.put(f"{BASE_URL}/api/contact/{message_id}/read", headers=auth_headers)
        
        # Verify count decreased
        stats_after_read = requests.get(f"{BASE_URL}/api/stats", headers=auth_headers).json()
        assert stats_after_read['messages_unread'] == initial_unread
        
        # Cleanup
        requests.delete(f"{BASE_URL}/api/contact/{message_id}", headers=auth_headers)
        print("✅ Unread count correctly updates when message is marked as read")
