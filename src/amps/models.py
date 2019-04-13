from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator


class Amp(models.Model):
    AMP_TYPES = [
        ("真空管アンプ", "真空管アンプ"),
        ("トランジスタアンプ", "トランジスタアンプ"),
        ("シミュレーター", "シミュレーター"),
    ]
    name = models.CharField(max_length=128, verbose_name='アンプ名')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='amps', null=True)
    brand = models.CharField(max_length=128, verbose_name='ブランド名')
    type = models.CharField(
        max_length=128, choices=AMP_TYPES, verbose_name='アンプの種類', default="真空管アンプ")
    image = models.ImageField(
        "アンプの画像", upload_to="images/%Y/%m/%d/", blank=True, null=True)

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
