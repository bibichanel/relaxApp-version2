from django.contrib import admin

# Register your models here.

from relax.models import Song

admin.site.register(Song)
class MusicAdmin(admin.ModelAdmin):
    list_display=['id', 'stt', 'title', 'artist']