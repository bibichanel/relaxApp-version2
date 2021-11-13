from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from . models import Users 
# from . forms import UsersCreationFrom

# Register your models here.

admin.site.register(Users)
