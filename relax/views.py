from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
class HomeClass(View):
    def get(self, request):
        return render(request, "home/home.html")

class ProfilesClass(View):
    def get(self, request):
        return render(request, "home/profile.html")

class AboutUsClass(View):
    def get(self, request):
        return render(request, "home/aboutUs.html")

class MenuClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/homeMenu.html")

from django.core.paginator import Paginator
from relax.models import Song

class MusicClass(LoginRequiredMixin, View):
    def get(self, request):
        paginator = Paginator(Song.objects.all(), 1)
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)

        song_list = Song.objects.all()
        context = {"page_obj": page_obj, "song_list": song_list}

        return render(request, "menu/music/music.html", context)

class ToolsClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/tools/tools.html")

class SnakeGameClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/tools/snakegame.html")
