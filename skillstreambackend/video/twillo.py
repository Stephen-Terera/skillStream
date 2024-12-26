# video/twilio.py
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant
from django.conf import settings

def generate_twilio_token(user_identity):
    """Generate a Twilio access token for the user."""
    token = AccessToken(
        settings.TWILIO_ACCOUNT_SID, 
        settings.TWILIO_API_KEY_SID, 
        settings.TWILIO_API_KEY_SECRET, 
        identity=user_identity
    )
    
    # Create Video Grant for connecting to the Twilio Video Room
    video_grant = VideoGrant(room=settings.TWILIO_VIDEO_SERVICE_SID)
    token.add_grant(video_grant)
    
    return token.to_jwt().decode('utf-8')

