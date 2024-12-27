# Create your models here.
from django.db import models
from django.db import models

from users.models import User
from django.utils.timezone import now 

class Class(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    max_students = models.PositiveIntegerField(default=30)
    teachers = models.ManyToManyField(User, limit_choices_to={'role': 'teacher'}, related_name='teaching_classes', blank=True)
    students = models.ManyToManyField(User, limit_choices_to={'role': 'student'}, related_name='enrolled_classes', blank=True)
    created_at = models.DateTimeField(default=now)  # default value = current date and time
    updated_at = models.DateTimeField(default=now)  # default value = current date and time
    status = models.CharField(max_length=20, choices=[('active', 'Active'), ('completed', 'Completed'), ('archived', 'Archived')], default='active')

    def __str__(self):
        return self.name


class LiveSession(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    class_for = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='live_sessions')
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='hosted_session')
    students = models.ManyToManyField(User, related_name='joined_session')
    start_time = models.DateTimeField(default=now)
    end_time = models.DateTimeField(default=now)
    session_id = models.CharField(max_length=255, unique=True, blank=True, null=True)         
    created_at = models.DateTimeField(default=now)  # default value = current date and time
    updated_at = models.DateTimeField(default=now)  # default value = current date and time
    status = models.CharField(max_length=20, choices=[('scheduled', 'Scheduled'), ('ongoing', 'Ongoing'), ('completed', 'Completed')], default='scheduled')

    def __str__(self):
        return f"{self.title} - {self.class_for.name}"

class OnDemandSession(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    class_for = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='on_demand_sessions')
    video_url = models.URLField()
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    duration = models.DurationField(null=True, blank=True)
    created_at = models.DateTimeField(default=now) #default date
    updated_at = models.DateTimeField(default=now) #default date

    def __str__(self):
        return f"{self.title} - {self.class_for.name}"


class Topic(models.Model):
    class_for = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='topics')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=now)
    updated_at = models.DateTimeField(default=now)

    def __str__(self):
        return self.title
    
    
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    class_for = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='tasks')
    due_date = models.DateField(default=now)

    def __str__(self):
        return f"{self.title} - {self.class_for.name}"

class Homework(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='homework_submissions')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='homework')
    submission_date = models.DateField(default=now)
    file = models.FileField(upload_to='homework/')
    grade = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.student.username} - {self.task.title}"
