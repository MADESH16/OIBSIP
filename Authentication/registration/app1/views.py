from imaplib import _Authenticator
from telnetlib import LOGOUT
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout

# Create your views here.
@login_required(login_url='Login')
def homepage(request):
    return render (request,'home.html')


def loginpage(request):
    if request.method == 'POST':
        uname=request.POST.get('username')
        pass1=request.POST.get('pass')
        user=authenticate(request,username=uname,password=pass1)
        if user is not None:
            login(request,user)
            return redirect('Home')

    return render(request,'login.html')

def logoutpage(request):
    logout(request)
    return redirect('Login')

def signuppage(request):
    if request.method == 'POST':
        uname=request.POST.get('username')
        email=request.POST.get('email')
        pass1=request.POST.get('password1')
        pass2=request.POST.get('password2')
        if pass1!=pass2:
            return HttpResponse('Password does not match')
        else:
            my_user=User.objects.create_user(uname,email,pass1)
            my_user.save()
            return redirect('Login')
        
    
    return render(request,'signup.html')