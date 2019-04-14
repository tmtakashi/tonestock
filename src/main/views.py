import json

from django.views.generic import TemplateView
from django.shortcuts import render

from instruments.models import Instrument
from amps.models import Amp
from pedals.models import Pedal

from instruments.forms import InstrumentForm
from main.view_model import GearMapper
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
        instruments = Instrument.objects.filter(
            owner=self.request.user).order_by('-updated_at')
        pedals = Pedal.objects.filter(
            owner=self.request.user).order_by('-updated_at')
        amps = Amp.objects.filter(
            owner=self.request.user).order_by('-updated_at')

        instrument_list = [GearMapper(instrument).as_dict()
                           for instrument in instruments]
        pedal_list = [GearMapper(pedal).as_dict() for pedal in pedals]
        amp_list = [GearMapper(amp).as_dict() for amp in amps]

        context['instrument_list'] = json.dumps({
            "instruments": instrument_list
        }, ensure_ascii=False)
        context['pedal_list'] = json.dumps({
            "pedals": pedal_list
        }, ensure_ascii=False)
        context['amp_list'] = json.dumps({
            "amps": amp_list
        }, ensure_ascii=False)
        return context
