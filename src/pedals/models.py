from django.db import models


class Pedal(models.Model):
    PEDAL_TYPES = [
        "コンパクトエフェクター",
        "マルチエフェクター",
    ]
    EFFECT_TYPES = [
        "オーバードライブ",
        "ディストーション",
        "ファズ",
        "リバーブ",
        "ディレイ",
        "コーラス",
        "フェイザー",
        "フランジャー",
        "ワウ",
        "ピッチシフター",
        "その他",
    ]
    name = models.CharField(max_length=128, verbose_name='エフェクターの名前')
    owner = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    type = models.CharField(
        max_length=128, choices=PEDAL_TYPES, verbose_name='エフェクターの種類')
    effect = models.CharField(
        max_length=128, choices=EFFECT_TYPES, verbose_name='エフェクト名')
    brand = models.CharField(max_len=128, verbose_name='ブランド名')

    def __str__(self):
        return self.name
