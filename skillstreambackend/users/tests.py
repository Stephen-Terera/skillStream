from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.contrib.auth.hashers import check_password
from .models import User

class UserModelTest(TestCase):
    def test_create_user(self):
        # Create a user instance
        user = User.objects.create(
            first_name="John",
            last_name="Doe",
            email="john.doe@example.com",
            role="teacher",
            age=30,
            password="secure_password_123"
        )

        # Check if user is created and saved
        self.assertEqual(user.first_name, "John")
        self.assertEqual(user.last_name, "Doe")
        self.assertEqual(user.email, "john.doe@example.com")
        self.assertEqual(user.role, "teacher")
        self.assertEqual(user.age, 30)

        # Ensure that the password is hashed
        self.assertTrue(check_password("secure_password_123", user.password))

    def test_user_password_hashing(self):
        # Create a user with a password
        user = User.objects.create(
            first_name="Jane",
            last_name="Doe",
            email="jane.doe@example.com",
            role="student",
            age=25,
            password="password123"
        )

        # Ensure password is hashed correctly
        self.assertNotEqual(user.password, "password123")  # The password should not be stored as plain text
        self.assertTrue(check_password("password123", user.password))  # Check if the hash is correct
