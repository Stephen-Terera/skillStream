from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Class, LiveSession, OnDemandSession, Topic
from users.models import User

class APITest(APITestCase):
    def setUp(self):
        # Create a test user
        self.user = User.objects.create(
            first_name='Test', last_name='User',
            email='testuser',
            role='tutors', age=30,
            password='testpassword'
        )
        # Create a test class
        self.class_instance = Class.objects.create(
            name='Test Class', description='Test Description',
            max_students=30, status='active', created_at='2021-10-10',
            updated_at='2021-10-10'
        )
       
    #write test case for get_classes
    def test_get_classes(self):
        url = reverse('get_classes')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Test Class')
        self.assertEqual(response.data[0]['description'], 'Test Description')
   