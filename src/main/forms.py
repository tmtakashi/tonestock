from django import forms

from instruments.models import Instrument
from amps.models import Amp
from pedals.models import Pedal

AddGearFormset = forms.inlineformset_factory(
    Instrument, Amp, Pedal,
    fields='__all__',
    can_delete=False
)
