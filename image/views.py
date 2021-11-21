from django.shortcuts import render
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Image
# Create your views here.
class ImageClass(LoginRequiredMixin, View):
    def get(self, request):
        images = Image.objects.all()
        return render(request, "menu/image/image.html", {'images': images})