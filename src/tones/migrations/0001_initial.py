# Generated by Django 2.1.7 on 2019-03-22 14:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('amps', '0002_amp_owner'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('instruments', '0002_instrument_owner'),
        ('pedals', '0002_auto_20190321_1644'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, verbose_name='プリセット名')),
                ('amp', models.ManyToManyField(blank=True, to='amps.Amp')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('instrument', models.ManyToManyField(blank=True, to='instruments.Instrument')),
                ('pedal', models.ManyToManyField(blank=True, to='pedals.Pedal')),
            ],
        ),
    ]
