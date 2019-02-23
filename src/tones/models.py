from django.db import models

from instruments.models import Instrument
from pedals.models import Pedal
from amps.models import Amp


class Tone(models.Model):
    name = models.CharField(max_length=124, verbose_name='プリセット名')
    instrument = models.ManyToManyField(
        Instrument, blank=True)
    pedal = models.ManyToManyField(
        Pedal, blank=True)
    amp = models.ManyToManyField(Amp, blank=True)
