# Generated by Django 2.1 on 2019-04-13 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tones', '0003_auto_20190411_2009'),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='favorite_tone',
            field=models.ManyToManyField(blank=True, to='tones.Tone', verbose_name='お気に入りのプリセット'),
        ),
    ]