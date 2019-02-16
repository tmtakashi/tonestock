from django.db import models
from django.contrib.auth import get_user_model


class Amp(models.Model):
    AMP_TYPES = [
        "真空管アンプ",
        "トランジスタアンプ",
        "シミュレーター",
    ]
    name = models.CharField(max_len=128, verbose_name='アンプ名')
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    brand = models.CharField(max_len=128, verbose_name='ブランド名')
    type = models.CharField(
        max_len=128, choices=AMP_TYPES, verbose_name='アンプの種類')

    def __str__(self):
        return self.name
