from django.contrib.auth.forms import UserCreationForm
from django import forms
# ユーザ作成フォームを継承


class SignUpForm(UserCreationForm):
    username = forms.CharField()
    email = forms.EmailField()
    password1 = forms.CharField(widget=forms.PasswordInput)
    password2 = forms.CharField(widget=forms.PasswordInput)
