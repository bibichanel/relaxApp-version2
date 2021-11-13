from django.http.response import HttpResponse
from django.shortcuts import redirect, render
from django.views import View
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from . forms import RegisterForm, CustomAuthForm

# Create your views here.
class SigninClass(View):
    def get(self, request):
        form = CustomAuthForm()
        return render(request, 'authentication/signin.html', {'form':form})

    def post(self, request):
        form = CustomAuthForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            authenticatedUser = authenticate(username=username, password=password)

            if authenticatedUser is not None:
                login(request, authenticatedUser)
                messages.info(request, f'You are now logged in as {username}')
                return redirect('home')
            else: 
                messages.error(request, 'Invalid username or password')

        form = CustomAuthForm()
        return render(request, 'authentication/signin.html', {'form':form})

class SignupClass(View):
    def get(self, request):
        form = RegisterForm()
        return render(request, 'authentication/signup.html', {'form':form})

    def post(self, request):
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.createUser_save()
            messages.success(request, 'Registration successful.' )
            return redirect('signin')
        else:
            messages.error(request, 'Unsuccessful registration. Invalid information.')
        form = RegisterForm()
        return render(request, 'authentication/signup.html', {'form':form})

class SignoutClass(View):
    def get(self, request):
        logout(request)
        messages.info(request, 'You have successfully logged out.')
        return redirect('home')