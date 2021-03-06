# Generated by Django 2.1.7 on 2019-04-10 14:49

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Pedal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128, verbose_name='エフェクターの名前')),
                ('type', models.CharField(choices=[('コンパクトエフェクター', 'コンパクトエフェクター'), ('マルチエフェクター', 'マルチエフェクター')], default='コンパクトエフェクター', max_length=128, verbose_name='エフェクターの種類')),
                ('effect', models.CharField(choices=[('overdrive', 'オーバードライブ'), ('distortion', 'ディストーション'), ('fuzz', 'ファズ'), ('reverb', 'リバーブ'), ('delay', 'ディレイ'), ('chorus', 'コーラス'), ('phaser', 'フェイザー'), ('flanger', 'フランジャー'), ('wah', 'ワウ'), ('pitch shifter', 'ピッチシフター'), ('others', 'その他')], max_length=128, verbose_name='エフェクト名')),
                ('brand', models.CharField(max_length=128, verbose_name='ブランド名')),
                ('image', models.ImageField(blank=True, null=True, upload_to='images/%Y/%m/%d/', verbose_name='エフェクターの画像')),
                ('gain', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Gain/Drive')),
                ('volume', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Volume/Master')),
                ('tone_knob', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Tone')),
                ('bass', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Bass')),
                ('middle', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Middle')),
                ('treble', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Treble')),
                ('mix', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Mix')),
                ('feedback', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Feedback')),
                ('rate', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Rate')),
                ('depth', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Depth')),
                ('decay', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Decay')),
                ('delay_time', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Delay Time')),
                ('pitch', models.FloatField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(10)], verbose_name='Pitch')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='pedals', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
