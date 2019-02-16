from django.db import models
from django.contrib.auth import get_user_model


class Pedal(models.Model):
    PEDAL_TYPES = [
        ('stomp_box', "コンパクトエフェクター"),
        ('multi_effects', "マルチエフェクター"),
    ]
    EFFECT_TYPES = [
        ('overdrive', "オーバードライブ"),
        ('distortion', "ディストーション"),
        ('fuzz', "ファズ"),
        ('reverb', "リバーブ"),
        ('delay', "ディレイ"),
        ('chorus', "コーラス"),
        ('phaser', "フェイザー"),
        ('flanger', "フランジャー"),
        ('wah', "ワウ"),
        ('pitch shifter', "ピッチシフター"),
        ('others', "その他"),
    ]
    name = models.CharField(max_length=128, verbose_name='エフェクターの名前')
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.CharField(
        max_length=128, choices=PEDAL_TYPES, verbose_name='エフェクターの種類')
    effect = models.CharField(
        max_length=128, choices=EFFECT_TYPES, verbose_name='エフェクト名')
    brand = models.CharField(max_length=128, verbose_name='ブランド名')

    def __str__(self):
        return self.name
