from django.db import models
from django.core.validators import FileExtensionValidator
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
    audio = models.FileField(upload_to='audio/%Y/%m/%d/',
                             validators=[FileExtensionValidator(['wav', 'mp3', 'aac', 'mp4'])], null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    tone = models.ForeignKey(Tone, on_delete=models.CASCADE)
    profile = models.ForeignKey('users.Profile', on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class CommentReply(models.Model):
    tone = models.ForeignKey(Tone, on_delete=models.CASCADE)
    profile = models.ForeignKey('users.Profile', on_delete=models.CASCADE)
    text = models.TextField()
    target = models.ForeignKey(Comment, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
