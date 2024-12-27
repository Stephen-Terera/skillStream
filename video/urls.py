# video/urls.py
from django.urls import path
from .views import generate_token

urlpatterns = [
    path('token/', generate_token, name='generate_token'),
]

