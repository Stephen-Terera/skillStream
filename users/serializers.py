from rest_framework import serializers
from .models import User
from django.contrib.auth import get_user_model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model =User 
        fields = ('username', 'email', 'role', 'password')
        extra_kwargs = {'password': {'write_only': True}}

def create(self, validated_data):
    """
    Create a new user with hashed password.
    """
    password = validated_data.pop('password', None)
    user = User.objects.create(**validated_data)

    if password:
        user.set_password(password)
        user.save()
    return user

def update(self, instance, validated_data):
    """
    Update user information and password (if provided).
    """
    password = validated_data.pop('password', None)
    instance = super().update(instance, validated_data)

    if password:
        instance.set_password(password)
        instance.save()

    return instance

def validate_role(self, value):
    """
    Ensure the role is a valid choice.
    """
    if value not in User.Role.values:
        raise serializers.ValidationError("Invalid role specified.")
    return value
