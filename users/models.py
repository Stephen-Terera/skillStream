from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    ROLES = [
        ('tutors', 'Tutors'),
        ('learners', 'Learners'),
        ('admin', 'Admin'),
    ]
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=10, choices=ROLES)
    age = models.PositiveIntegerField()
    password = models.CharField(max_length=128)  # Storing a hashed password

    def save(self, *args, **kwargs):
        # Ensure the password is hashed before saving
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
