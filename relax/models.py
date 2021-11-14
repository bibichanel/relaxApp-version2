from django.db import models

# Create your models here.

from django.urls import reverse

class Song(models.Model):
    stt = models.TextField(default="")
    title = models.TextField(default="Nameless")
    artist = models.TextField(default="Unknown")
    image = models.ImageField(default="https://cdn.pixabay.com/photo/2014/04/02/10/57/vinyl-305025_640.png")
    audio_file = models.FileField(blank=True,null=True)
    audio_link = models.CharField(max_length=200,blank=True,null=True)
    duration = models.CharField(max_length=20, default="0")
    paginate_by = 2

    def __str__(self):
        return self.title