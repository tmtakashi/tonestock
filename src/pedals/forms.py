from django import forms
from django.forms import modelformset_factory

from .models import Pedal


class PedalForm(forms.ModelForm):
    class Meta:
        model = Pedal
        fields = ('name', 'type', 'brand')
        widgets = {
            'type': forms.RadioSelect()
        }


PedalFormset = modelformset_factory(
    Pedal,
    fields=('name', 'type', 'brand'),
    widgets={
        'type': forms.RadioSelect()
    },
    extra=0,
)
