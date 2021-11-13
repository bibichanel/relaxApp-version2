from django.urls import path
from authencation import views

urlpatterns = [
    path('signin/', views.SigninClass.as_view(), name='signin'),
    path('signup/', views.SignupClass.as_view(), name='signup'),
    path('signout/', views.SignoutClass.as_view(), name='signout'),
]