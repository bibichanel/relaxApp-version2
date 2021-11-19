from django.urls import path
from chat import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('test-chat/', views.TestChatClass.as_view(), name='test-chat'),
    path('test-chat/<str:room_name>/', views.RoomClass.as_view(), name='room'),
    path('menu/chat/<str:room_name>/', views.ChatClass.as_view(), name='chat'),
]
