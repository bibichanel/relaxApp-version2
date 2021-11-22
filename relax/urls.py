from django.urls import path
from relax import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.HomeClass.as_view(), name='home'),
    path('profile/', views.ProfilesClass.as_view(), name='profile'),
    path('about-us/', views.AboutUsClass.as_view(), name='about-us'),
    path('menu/', views.MenuClass.as_view(), name='menu'),
    path('music/', views.MusicClass.as_view(), name='music'),
    path('tools/', views.ToolsClass.as_view(), name='tools'),
    path('tools/snakegame/', views.SnakeGameClass.as_view(), name='snakegame'),
]
