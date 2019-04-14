import json

from django.http.response import JsonResponse
from django.urls import reverse_lazy, reverse
from django.shortcuts import render
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from .models import Instrument
from .forms import InstrumentForm


def add_instrument(request):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        instrument = Instrument(
            owner=request.user,
            name=info['name'],
            brand=info['brand'],
            type=info['type']
        )

        instrument.save()

        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


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
