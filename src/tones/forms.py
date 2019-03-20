from django import forms

from .models import Tone

from amps.forms import AmpForm
from instruments.forms import InstrumentForm
from pedals.forms import PedalFormset

from betterforms.multiform import MultiModelForm


class ToneForm(forms.ModelForm):
    class Meta:
        model = Tone
        fields = ('name',)


class ToneCreationMultiForm(MultiModelForm):
    form_classes = {
        'tone': ToneForm,
        'instrument': InstrumentForm,
        'pedal': PedalFormset,
        'amp': AmpForm,
    }
