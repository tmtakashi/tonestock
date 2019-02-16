from django.db import models
from django.contrib.auth import get_user_model


class Instrument(models.Model):
    INSTRUMENT_TYPES = [
        ('guitar', 'ギター'),
        ('bass', 'ベース'),
    ]
    name = models.CharField(max_length=128, verbose_name='楽器の名前')
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.CharField(
        max_length=10, choices=INSTRUMENT_TYPES, verbose_name='楽器の種類')
    brand = models.CharField(max_length=128, verbose_name='ブランド名')

    def __str__(self):
        return self.name
