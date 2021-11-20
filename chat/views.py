from django.shortcuts import render
from django.views import View
from .models import Message
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator
from relax.models import Song

class ChatClass(LoginRequiredMixin, View):
    def get(self, request, room_name):
        messages =  Message.objects.filter(room=room_name)[0:25]

        paginator = Paginator(Song.objects.all(), 1)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        context = {
            'room_name': room_name,
            'messages': messages,
            "page_obj": page_obj,
        }

        return render(request, "menu/chat/chat.html",  context)
