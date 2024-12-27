from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Class, LiveSession, OnDemandSession, Task, Homework, Topic
from .serializers import (
    ClassSerializer,
    LiveSessionSerializer,
    OnDemandSessionSerializer,
    TaskSerializer,
    HomeworkSerializer,
    TopicSerializer,
)
from users.models import User
from users.serializers import UserSerializer 
from users.permissions import IsTutorOrAdmin 
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import LiveSession
from .utils import generate_access_token
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import LiveSession
from django.contrib.auth.decorators import login_required
import uuid
import json

@api_view(['GET'])
def get_classes(request):
    '''Retrieve all classess'''
    try: 
        classes = Class.objects.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data, status.HTTP_200_OK)
    except Class.DoesNotExist:
        return Response({'detail': 'Classes not found'})

@api_view(['GET'])
def get_class(request, pk):
    '''Retrieve a class by its ID (primary key)'''
    try:
        # Fetch the class by ID
        class_instance = Class.objects.get(pk=pk)
        # Serialize the class instance
        serializer = ClassSerializer(class_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Class.DoesNotExist:
        return Response(
            {"detail": "Class not found."},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([IsTutorOrAdmin])
def create_new_class(request):
    '''Create a new class. Must be tutor or Admin'''
    if request.method == 'POST':
        serializer = ClassSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsTutorOrAdmin])
def update_class(request,pk):
    '''Update a specific class'''
    try:
        # Fetch the class instance by ID
        class_instance = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response(
            {"detail": "Class not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    # Deserialize and validate incoming data
    serializer = ClassSerializer(class_instance, data=request.data)
    if serializer.is_valid():
        serializer.save()  # Save the updated class instance
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsTutorOrAdmin])
def delete_class(request, pk):
    '''Delete a class'''
    try:
        # Fetch the class instance by ID
        class_instance = Class.objects.get(pk=pk)
        class_instance.delete()  # Delete the instance
        return Response(
            {"detail": "Class deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )
    except Class.DoesNotExist:
        return Response(
            {"detail": "Class not found."},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
def enroll_in_class(request):
    '''This is for a user to enrol in a class.'''
    user_id = request.data.get('user_id')
    class_id = request.data.get('class_id')

    try:
        # Fetch the user and class
        student = User.objects.get(pk=user_id)
        enrolled_class = Class.objects.get(pk=class_id)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    except Class.DoesNotExist:
        return Response({"detail": "Class not found."}, status=status.HTTP_404_NOT_FOUND)

    # Check if the user is already a student in the class
    if enrolled_class.students.filter(pk=user_id).exists():
        return Response({"detail": "User is already enrolled in this class."}, status=status.HTTP_400_BAD_REQUEST)

    # Add the user as a student to the class
    enrolled_class.students.add(student)
    enrolled_class.save()

    return Response(
        {"detail": f"User {student.username} successfully enrolled in class {enrolled_class.name}."},
        status=status.HTTP_200_OK
    )

@api_view(['GET'])
def get_class_learners(request,pk):
    '''Retrieve a list of all learners in a class'''
    try:
        # Fetch the class by ID
        enrolled_class = Class.objects.get(pk=pk)
    except Class.DoesNotExist:
        return Response({"detail": "Class not found."}, status=status.HTTP_404_NOT_FOUND)

    # Get all students in the class
    learners = enrolled_class.students.all()

    # Serialize the students
    serializer = UserSerializer(learners, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def live_session_list(request, class_id):
    try:
        class_instance = Class.objects.get(pk=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        sessions = LiveSession.objects.filter(class_for=class_instance)
        serializer = LiveSessionSerializer(sessions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = LiveSessionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(class_for=class_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def task_list(request, class_id):
    try:
        class_instance = Class.objects.get(pk=class_id)
    except Class.DoesNotExist:
        return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        tasks = Task.objects.filter(class_for=class_instance)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(class_for=class_instance)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
def join_session(request, session_id):
    """
    Endpoint for joining a live video session.
    """
    session = get_object_or_404(LiveSession, pk=session_id)
    room_name = session.session_id or session.title  # Use session ID or title as room name
    token = generate_access_token(request.user.username, room_name)
    return JsonResponse({
        'token': token,
        'room_name': room_name
    })
@login_required
def get_twilio_token(request, session_id):
    """
    Endpoint for fetching a Twilio access token for a session.
    """
    session = get_object_or_404(LiveSession, pk=session_id)
    room_name = session.session_id or session.title  # Use session_id as the room name
    token = generate_access_token(request.user.username, room_name)

    return JsonResponse({
        'token': token,
        'room_name': room_name,
    })
@csrf_exempt
@login_required
def create_session(request):
    """
    Endpoint for creating a live session.
    Only teachers can create sessions.
    """
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title")
        start_time = data.get("start_time")
        end_time = data.get("end_time")

        if not request.user.groups.filter(name='Teachers').exists():
            return JsonResponse({'error': 'Only teachers can create sessions.'}, status=403)

        session = LiveSession.objects.create(
            title=title,
            teacher=request.user,
            start_time=start_time,
            end_time=end_time,
            session_id=str(uuid.uuid4())  # Generate a unique session ID
        )
        return JsonResponse({'message': 'Session created successfully', 'session_id': session.id})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
