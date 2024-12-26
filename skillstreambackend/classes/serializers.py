from rest_framework import serializers
from .models import Class, LiveSession, OnDemandSession, Task, Homework, Topic
from users.models import User  # Import User model from the `users` app

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'age']


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class ClassSerializer(serializers.ModelSerializer):
    teachers = UserSerializer(many=True, read_only=True)
    students = UserSerializer(many=True, read_only=True)
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Class
        fields = '__all__'


class LiveSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiveSession
        fields = '__all__'


class OnDemandSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnDemandSession
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'
