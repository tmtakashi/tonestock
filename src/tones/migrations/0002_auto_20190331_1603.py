# Generated by Django 2.1.7 on 2019-03-31 07:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tones', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tone',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tones', to=settings.AUTH_USER_MODEL),
        ),
    ]
