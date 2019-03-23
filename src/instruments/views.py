from django.urls import reverse_lazy
from django.views.generic import CreateView

from .models import Instrument
from .forms import InstrumentForm


class CreateInstrumentView(CreateView):
    model = Instrument
    form_class = InstrumentForm
    template_name = 'instruments/add_instrument.html'
    success_url = reverse_lazy('home')
