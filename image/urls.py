from django.urls import path
from image import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('image/', views.ImageClass.as_view(), name='image'),
]
