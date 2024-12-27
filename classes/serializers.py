from rest_framework import serializers
from .models import Class, LiveSession, OnDemandSession, Task, Homework, Topic
from users.models import User  # Import User model from the `users` app
from users.serializers import UserSerializer

#create a Task serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'
#create a Topic serializer
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'

#create a Homework serializer
class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = '__all__'
        
class ClassSerializer(serializers.ModelSerializer):
    teachers = UserSerializer(many=True, read_only=True)
    students = UserSerializer(many=True, read_only=True)
    topics = TopicSerializer(many=True, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    #create a create function
    def create(self, validated_data):
        teachers_data = validated_data.pop('teachers')
        students_data = validated_data.pop('students')
        topics_data = validated_data.pop('topics')

        class_instance = Class.objects.create(**validated_data)
        for teacher in teachers_data:
            class_instance.teachers.add(teacher)
        for student in students_data:
            class_instance.students.add(student)
        for topic in topics_data:
            class_instance.topics.add(topic)
        return class_instance

    class Meta:
        model = Class
        fields = '__all__'


class LiveSessionSerializer(serializers.ModelSerializer):
    class_for = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all())
    teacher = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='teacher'))
    students = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.filter(role='student'))
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = LiveSession
        fields = '__all__'


class OnDemandSessionSerializer(serializers.ModelSerializer):
    class_for = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all())
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = OnDemandSession
        fields = '__all__'
