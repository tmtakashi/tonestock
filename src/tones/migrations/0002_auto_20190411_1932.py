# Generated by Django 2.2a1 on 2019-04-11 10:32

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tones', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tone',
            name='amp',
        ),
        migrations.RemoveField(
            model_name='tone',
            name='instrument',
        ),
        migrations.RemoveField(
            model_name='tone',
            name='name',
        ),
        migrations.RemoveField(
            model_name='tone',
            name='pedals',
        ),
        migrations.AddField(
            model_name='tone',
            name='tone_info',
            field=django.contrib.postgres.fields.jsonb.JSONField(null=True),
        ),
    ]
