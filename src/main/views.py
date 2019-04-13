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


class UserGearListView(TemplateView):
    template_name = 'user_gear_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['instruments'] = Instrument.objects.filter(
            owner=self.request.user).order_by('-updated_at')
        context['pedals'] = Pedal.objects.filter(
            owner=self.request.user).order_by('-updated_at')
        context['amps'] = Amp.objects.filter(
            owner=self.request.user).order_by('-updated_at')

        return context
