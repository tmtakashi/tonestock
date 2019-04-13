from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from .models import Instrument
from .forms import InstrumentForm


class CreateInstrumentView(CreateView):
    model = Instrument
    form_class = InstrumentForm
    template_name = 'instruments/add_instrument.html'
    success_url = reverse_lazy('user_gear_list')

    def form_valid(self, form):
        self.object = form.save()
        print(self.request.user)
        self.object.owner = self.request.user
        return super().form_valid(form)


class InstrumentDetailView(DetailView):
    model = Instrument
    context_object_name = "gear"


class DeleteInstrumentView(DeleteView):
    model = Instrument
    success_url = reverse_lazy('user_gear_list')


class UpdateInstrumentView(UpdateView):
    model = Instrument
    form_class = InstrumentForm
    template_name = 'instruments/edit_instrument.html'

    def get_success_url(self, **kwargs):
        return reverse_lazy("instruments:detail", args=(self.object.pk,))
