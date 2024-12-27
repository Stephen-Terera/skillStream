from django.urls import path
from . import views

urlpatterns = [
    #URL for get_class 
    path('classes/', views.get_classes, name='get_classes'),
]
