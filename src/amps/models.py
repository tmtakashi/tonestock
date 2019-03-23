from django.db import models
from django.contrib.auth import get_user_model

from django.core.validators import MaxValueValidator, MinValueValidator


class Amp(models.Model):
    AMP_TYPES = [
        ("真空管アンプ", "真空管アンプ"),
        ("トランジスタアンプ", "トランジスタアンプ"),
        ("シミュレーター", "シミュレーター"),
    ]
    name = models.CharField(max_length=128, verbose_name='アンプ名')
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, null=True)
    brand = models.CharField(max_length=128, verbose_name='ブランド名')
    type = models.CharField(
        max_length=128, choices=AMP_TYPES, verbose_name='アンプの種類', default="真空管アンプ")

    gain = bass = models.FloatField(verbose_name='Gain/Drive',
                                    validators=[MinValueValidator(
                                        0), MaxValueValidator(10)],
                                    default=0
                                    )

    volume = models.FloatField(verbose_name='Volume/Master',
                               validators=[MinValueValidator(
                                   0), MaxValueValidator(10)],
                               default=0
                               )

    bass = models.FloatField(verbose_name='Bass',
                             validators=[MinValueValidator(
                                 0), MaxValueValidator(10)],
                             default=0
                             )
    middle = models.FloatField(verbose_name='Middle',
                               validators=[MinValueValidator(
                                   0), MaxValueValidator(10)],
                               default=0
                               )
    treble = models.IntegerField(verbose_name='Treble',
                                 validators=[MinValueValidator(
                                     0), MaxValueValidator(10)],
                                 default=0
                                 )
    presence = models.IntegerField(verbose_name='Presence',
                                   validators=[MinValueValidator(
                                       0), MaxValueValidator(10)],
                                   default=0
                                   )

    def __str__(self):
        return self.name
