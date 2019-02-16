from django.views import generic
from django.shortcuts import render

from instruments.models import Instrument
from amps.models import Amp
from pedals.models import Pedal

from instruments.forms import InstrumentForm
from amps.forms import AmpForm
from pedals.forms import PedalForm


class HomePageView(generic.TemplateView):
    template_name = 'home.html'


def add_gear_view(request):
    if request.method == 'POST':
        instrument_form = InstrumentForm(request.POST)
        amp_form = AmpForm(request.POST)
        pedal_form = PedalForm(request.POST)
        if instrument_form.is_valid() and amp_form.is_valid() and pedal_form.is_valid():
            instrument = instrument_form.save()
            amp = instrument_form.save()
            pedal = pedal_form.save()
    else:
        instrument_form = InstrumentForm()
        amp_form = AmpForm()
        pedal_form = PedalForm()
    context = {
        'instrument_form': instrument_form,
        'amp_form': amp_form,
        'pedal_form': pedal_form,
    }
    return render(request, 'add_gears.html', context=context)
