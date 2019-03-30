from django.contrib.auth import get_user_model
from django.db import models


class Instrument(models.Model):
    INSTRUMENT_TYPES = [
        ('ギター', 'ギター'),
        ('ギター', 'ベース'),
    ]
    name = models.CharField(max_length=128, verbose_name='楽器の名前')
    owner = models.ForeignKey(
        get_user_model(), related_name='instruments', on_delete=models.CASCADE, null=True)
    type = models.CharField(
        max_length=10, choices=INSTRUMENT_TYPES, verbose_name='楽器の種類', default='ギター')
    brand = models.CharField(max_length=128, verbose_name='ブランド名')
    image = models.ImageField(
        "楽器の画像", upload_to="images/%Y/%m/%d/", blank=True, null=True)

    def __str__(self):
        return self.name
