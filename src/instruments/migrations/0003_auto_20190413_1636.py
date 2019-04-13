# Generated by Django 2.2 on 2019-04-13 07:36

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('instruments', '0002_instrument_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='instrument',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='instrument',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
