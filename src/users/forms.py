from django.contrib.auth import get_user_model
from django.contrib.auth.forms import (
    AuthenticationForm, UserCreationForm
)
from django import forms

from .models import Profile

User = get_user_model()


class UserForm(UserCreationForm):

    class Meta:
        model = User
        if User.USERNAME_FIELD == 'email':
            fields = ('email',)
        else:
            fields = ('username', 'email')
        labels = {
            "username": "メールアドレス"
        }


class ProfileForm(forms.ModelForm):
    image = forms.ImageField(label='Profile Image',
                             required=False, widget=forms.FileInput)

    class Meta:
        model = Profile
        fields = ('username', 'image')
