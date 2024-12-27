
# Create your models here.
from django.db import models


from django.db import models
from django.conf import settings

class Chat(models.Model):
    """Chat metadata for groups or private chats."""
    name = models.CharField(max_length=255, blank=True, null=True)  # For group chats
    is_group = models.BooleanField(default=False)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='chats')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name if self.is_group else f"Chat between {', '.join(self.members.values_list('username', flat=True))}"


class GroupAdmin(models.Model):
    """Admins for a group chat."""
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='admins')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"Admin: {self.user.username} in {self.chat.name if self.chat.name else self.chat.id}"
