from django.urls import reverse_lazy
from django.views.generic import CreateView

from .models import Instrument
from .forms import InstrumentForm


class CreateInstrumentView(CreateView):
    model = Instrument
    form_class = InstrumentForm
    template_name = 'instruments/add_instrument.html'
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        self.object = form.save()
        self.object.owner = self.request.user
        return super().form_valid(form)
