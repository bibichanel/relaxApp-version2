from django import forms
from .models import Users
from django.contrib.auth.forms import AuthenticationForm 

class RegisterForm(forms.Form):
    username = forms.CharField(label='Username', max_length=40, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    nickname = forms.CharField(label='Nickname', max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Nickname'}))
    password = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
    retypePassword = forms.CharField(label='Retype password', widget=forms.PasswordInput(attrs={'placeholder': 'Retype password'}))

    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            Users.objects.get(username=username)
        except Users.DoesNotExist:
            return username
        raise forms.ValidationError("Username already exists")

    def clean_nickname(self):
        nickname = self.cleaned_data['nickname']
        try:
            Users.objects.get(nickname=nickname)
        except Users.DoesNotExist:
            return nickname
        raise forms.ValidationError("Nickname already exists")

    def clean_Password(self):
        if 'password' in self.cleaned_data:
            password = self.cleaned_data['password']
            retypePassword = self.cleaned_data['retypePassword']
            if password == retypePassword and password:
                return retypePassword
        raise forms.ValidationError('Invalid password')
    
    def createUser_save(self):
        Users.objects.create_user(username=self.cleaned_data['username'], nickname=self.cleaned_data['nickname'], password=self.cleaned_data['password'])

class CustomAuthForm(AuthenticationForm):
    username = forms.CharField(label='Username', max_length=40, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
    password = forms.CharField(label='Password', widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))