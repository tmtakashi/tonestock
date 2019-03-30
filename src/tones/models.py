from django.db import models
from django.contrib.auth import get_user_model

from instruments.models import Instrument
from pedals.models import Pedal
from amps.models import Amp

User = get_user_model()


class Tone(models.Model):
    author = models.ForeignKey(
        User, related_name='tones', on_delete=models.CASCADE)
    name = models.CharField(max_length=124, verbose_name='プリセット名')
    instrument = models.ManyToManyField(
        Instrument, blank=True)
    pedal = models.ManyToManyField(
        Pedal, blank=True)
    amp = models.ManyToManyField(Amp, blank=True)

    def __str__(self):
        return self.name
