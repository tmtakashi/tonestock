from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import JSONField
from django.utils import timezone

from instruments.models import Instrument
from pedals.models import Pedal
from amps.models import Amp


class Tone(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name='tones', on_delete=models.CASCADE)
    info = JSONField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
