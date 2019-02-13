from django.contrib.auth.forms import UserCreationForm
from django import forms


class SignUpForm(UserCreationForm):
    username = forms.CharField()
    password1 = forms.CharField(widget=forms.widgets.PasswordInput)
    password2 = forms.CharField(widget=forms.widgets.PasswordInput)
