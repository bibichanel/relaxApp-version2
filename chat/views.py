from django.shortcuts import render
from django.views import View
from .models import Message
from django.contrib.auth.mixins import LoginRequiredMixin

class ChatClass(LoginRequiredMixin, View):
    def get(self, request, room_name):
        messages =  Message.objects.filter(room=room_name)[0:25]

        return render(request, "menu/chat/chat.html",  {'room_name': room_name, 'messages': messages})