from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField

from instruments.models import Instrument
from pedals.models import Pedal
from amps.models import Amp

User = get_user_model()


class Tone(models.Model):
    author = models.ForeignKey(
        User, related_name='tones', on_delete=models.CASCADE)
    name = models.CharField(max_length=124, verbose_name='プリセット名')
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    pedals = ArrayField(
        JSONField()
    )
    amp = models.ForeignKey(Amp, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
