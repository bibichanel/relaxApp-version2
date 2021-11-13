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

class ChatClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/chat/chat.html")

class MusicClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/music/music.html")
    
class ToolsClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/tools/tools.html")

class ImageClass(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, "menu/image/image.html")
