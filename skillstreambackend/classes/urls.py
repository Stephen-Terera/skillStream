from django.urls import path
from django.urls import path
from . import views
urlpatterns = [        # List all classes and create a new class
                # URL for the task list for a specific class
    path('classes/<int:class_id>/tasks/', views.task_list, name='task_list'),

    # URL for live session list for a specific class
    path('classes/<int:class_id>/live-sessions/', views.live_session_list, name='live_session_list'),

    # URL for class detail (using primary key)
    path('classes/<int:pk>/', views.class_detail, name='class_detail'),
]
