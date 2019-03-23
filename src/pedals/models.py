from django.db import models
from django.contrib.auth import get_user_model

from django.core.validators import MaxValueValidator, MinValueValidator


class Pedal(models.Model):
    PEDAL_TYPES = [
        ("コンパクトエフェクター", "コンパクトエフェクター"),
        ("マルチエフェクター", "マルチエフェクター"),
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
    owner = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, null=True)
    type = models.CharField(
        max_length=128, choices=PEDAL_TYPES, verbose_name='エフェクターの種類', default="コンパクトエフェクター")
    effect = models.CharField(
        max_length=128, choices=EFFECT_TYPES, verbose_name='エフェクト名')
    brand = models.CharField(max_length=128, verbose_name='ブランド名')

    '''
    歪み系
    '''

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

    tone_knob = models.FloatField(verbose_name='Tone',
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

    '''
    空間系
    '''
    mix = models.FloatField(verbose_name='Mix',
                            validators=[MinValueValidator(
                                0), MaxValueValidator(10)],
                            default=0
                            )
    feedback = models.FloatField(verbose_name='Feedback',
                                 validators=[MinValueValidator(
                                     0), MaxValueValidator(10)],
                                 default=0
                                 )
    rate = models.FloatField(verbose_name='Rate',
                             validators=[MinValueValidator(
                                 0), MaxValueValidator(10)],
                             default=0
                             )
    depth = models.FloatField(verbose_name='Depth',
                              validators=[MinValueValidator(
                                  0), MaxValueValidator(10)],
                              default=0
                              )
    # リバーブ
    decay = models.FloatField(verbose_name='Decay',
                              validators=[MinValueValidator(
                                  0), MaxValueValidator(10)],
                              default=0
                              )

    # ディレイ
    delay_time = models.FloatField(verbose_name='Delay Time',
                                   validators=[MinValueValidator(
                                       0), MaxValueValidator(10)],
                                   default=0
                                   )
    # ワウ
    pitch = models.FloatField(verbose_name='Pitch',
                              validators=[MinValueValidator(
                                  0), MaxValueValidator(10)],
                              default=0
                              )

    def __str__(self):
        return self.name
