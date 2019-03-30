from django import forms
from .models import Amp


class AmpForm(forms.ModelForm):
    class Meta:
        model = Amp
        fields = ('name', 'brand', 'type', 'image')
        widgets = {
            'type': forms.RadioSelect()
        }
