from django.shortcuts import render

# Create your views here.
# video/views.py
from django.http import JsonResponse
from .twilio import generate_twilio_token

def generate_token(request):
    """Generate Twilio Video access token."""
    user_identity = request.user.username  # Or any user identifier
    token = generate_twilio_token(user_identity)
    
    return JsonResponse({'token': token})

