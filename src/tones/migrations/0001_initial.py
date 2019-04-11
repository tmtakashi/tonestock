# Generated by Django 2.1.7 on 2019-04-11 10:22

from django.conf import settings
import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('amps', '0002_amp_owner'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('instruments', '0002_instrument_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tone',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, verbose_name='プリセット名')),
                ('pedals', django.contrib.postgres.fields.jsonb.JSONField(blank=True, default=list, null=True)),
                ('amp', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='amps.Amp')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tones', to=settings.AUTH_USER_MODEL)),
                ('instrument', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='instruments.Instrument')),
            ],
        ),
    ]
