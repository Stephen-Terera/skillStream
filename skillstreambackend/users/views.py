from django.contrib.auth.hashers import make_password
from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from .models import User
from .serializers import UserSerializer

@api_view (['POST'])
def register_user(request):
    if request.method == 'POST':
        # Initialize the serializer with the data from the request
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            # Save the new user
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({'refresh': str(refresh),'access': str(refresh.access_token),})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_user_profile(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user != user:
        return Response({'detail': 'You cannot update another user\'s profile'}, status=status.HTTP_403_FORBIDDEN)

    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def change_user_password(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.user != user:
        return Response({'detail': 'You cannot change another user\'s password'}, status=status.HTTP_403_FORBIDDEN)

    new_password = request.data.get('password')
    if new_password:
        user.password = make_password(new_password)
        user.save()
        return Response({'detail': 'Password updated successfully'})
    return Response({'detail': 'No password provided'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def list_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
@api_view(['DELETE'])
@permission_classes([permissions.IsAdminUser])
def delete_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response({'detail': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
