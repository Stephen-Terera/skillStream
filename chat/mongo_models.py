from pymongo import MongoClient
from django.conf import settings

client = MongoClient()  # Use connection string for remote MongoDB
db = client.chat_messages_db  # Replace with your MongoDB name

class Message:
    collection = db.messages  # Use a dedicated collection for messages

    @staticmethod
    def create(chat_id, sender_id, text=None, file_path=None):
        message = {
            'chat_id': chat_id,
            'sender_id': sender_id,
            'text': text,
            'file_path': file_path,
            'timestamp': datetime.utcnow(),
        }
        result = Message.collection.insert_one(message)
        return result.inserted_id

    @staticmethod
    def get_messages(chat_id):
        return list(Message.collection.find({'chat_id': chat_id}).sort('timestamp'))
