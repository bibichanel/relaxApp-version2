from django.db import models
from authencation.models import Users
# Create your models here.

class Message(models.Model):
    username = models.ForeignKey(Users, on_delete=models.CASCADE, blank=True, null=True)
    room = models.CharField(max_length=255)
    content = models.TextField(unique=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    usernameAnonymous = models.CharField(max_length=255, blank=True, null=True )

    def __str__(self):
        return self.user

    class Meta:
        ordering = ('timestamp',)
