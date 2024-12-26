from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User
from .models import Class, Task

class ClassesAppTests(APITestCase):

    def setUp(self):
        # Create test users
        self.teacher1 = User.objects.create(
            first_name="John", last_name="Doe", email="john.doe@example.com", role="teacher", age=35, password="password123"
        )
        self.teacher2 = User.objects.create(
            first_name="Jane", last_name="Smith", email="jane.smith@example.com", role="teacher", age=30, password="password123"
        )
        self.student1 = User.objects.create(
            first_name="Alice", last_name="Johnson", email="alice.johnson@example.com", role="student", age=20, password="password123"
        )
        
        # Create a test class
        self.test_class = Class.objects.create(
            name="Physics 101",
            description="Introduction to Physics",
            max_students=30,
        )
        self.test_class.teachers.set([self.teacher1, self.teacher2])
        self.test_class.students.set([self.student1])

    def test_get_class_list(self):
        response = self.client.get('/classes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_class(self):
        data = {
            "name": "Math 101",
            "description": "Introduction to Mathematics",
            "max_students": 25,
            "teachers": [self.teacher1.id],
            "students": [self.student1.id]
        }
        response = self.client.post('/classes/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], "Math 101")

    def test_get_class_detail(self):
        response = self.client.get(f'/classes/{self.test_class.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Physics 101")

    def test_update_class(self):
        data = {
            "name": "Advanced Physics 101",
            "description": "Advanced topics in Physics",
            "max_students": 35,
            "teachers": [self.teacher1.id],
            "students": [self.student1.id]
        }
        response = self.client.put(f'/classes/{self.test_class.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], "Advanced Physics 101")

    def test_delete_class(self):
        response = self.client.delete(f'/classes/{self.test_class.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_live_sessions(self):
        # Assuming a live session model and API implementation
        response = self.client.get(f'/classes/{self.test_class.id}/live-sessions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)  # No live sessions yet
# Create your tests here.
