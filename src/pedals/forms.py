from django import forms
from .models import Pedal


class PedalForm(forms.ModelForm):
    class Meta:
        model = Pedal
        fields = ('name', 'type', 'brand')
