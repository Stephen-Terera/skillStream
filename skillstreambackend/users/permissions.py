from rest_framework import permissions
from django.contrib.auth import get_user_model
from .models import User

UserProfile = User
class IsAdmin(permissions.BasePermission):
    """
    Permission to allow access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == UserProfile.role.ADMIN

class IsUserOrAdmin(permissions.BasePermission):
    """
    Permission to allow access only to the user themselves or admins.
    """
    def has_object_permission(self, request, view, obj):
        if request.user == obj:
            return True
        if request.user.role == UserProfile.role.ADMIN:
            return True
        return False

class IsTutorOrAdmin(permissions.BasePermission):
    """
    Permission to allow access only to tutors or admins.
    """
    def has_object_permission(self, request, view, obj):
        if request.user.role == UserProfile.role.TUTOR:
            return True
        if request.user.role == UserProfile.role.ADMIN:
            return True
        return False

class CanUpdateRole(permissions.BasePermission):
    """
    Permission to allow only admins to update user roles.
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == UserProfile.role.ADMIN

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Allows access only to the user who owns the resource or to admins.
    """
    def has_object_permission(self, request, view, obj):
        # Users can view their own profile and admins can view any profile
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user == obj:
            return True
        if request.user.role == UserProfile.role.ADMIN:
            return True
        return False
