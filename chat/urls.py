from django.urls import path
from chat import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('menu/chat/<str:room_name>/', views.ChatClass.as_view(), name='chat'),
]
