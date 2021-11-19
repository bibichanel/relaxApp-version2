from django.shortcuts import render
from django.views import View
from .models import Message
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class TestChatClass(View):
    def get(self, request):
        return render(request, 'menu/chat/testChat.html')

class RoomClass(View):
    def get(self, request, room_name ):
        username = request.GET.get('username', 'anonymous')
        messages =  Message.objects.filter(room=room_name)[0:25]

        return render(request, 'menu/chat/room.html', {'room_name': room_name, 'username': username})

class ChatClass(LoginRequiredMixin, View):
    def get(self, request, room_name):
        messages =  Message.objects.filter(room=room_name)[0:25]

        return render(request, "menu/chat/chat.html",  {'room_name': room_name, 'messages': messages})