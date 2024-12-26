from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

# Replace these with your Twilio credentials
TWILIO_ACCOUNT_SID = 'your_account_sid'
TWILIO_API_KEY_SID = 'your_api_key_sid'
TWILIO_API_KEY_SECRET = 'your_api_key_secret'

def generate_access_token(identity, room_name):
    """
    Generate a Twilio Access Token for a specific user and room.
    Args:
        identity (str): Unique identifier for the user (e.g., username).
        room_name (str): Name of the video room.
    Returns:
        str: JWT token for Twilio Video access.
    """
    token = AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, identity=identity)
    video_grant = VideoGrant(room=room_name)
    token.add_grant(video_grant)
    return token.to_jwt()
