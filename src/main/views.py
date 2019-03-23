from django.views.generic import TemplateView
from django.shortcuts import render

from instruments.models import Instrument
from amps.models import Amp
from pedals.models import Pedal

from instruments.forms import InstrumentForm
from amps.forms import AmpForm
from pedals.forms import PedalForm


class HomePageView(TemplateView):
    template_name = 'home.html'


class AddGearView(TemplateView):
    template_name = 'add_gears.html'
