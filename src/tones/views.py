from django.shortcuts import render
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.shortcuts import redirect

from .forms import ToneCreationMultiForm


class ToneCreateView(CreateView):
    form_class = ToneCreationMultiForm
    template_name = 'tones/add_tone.html'
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        tone = form['tone'].save()

        instrument = form['instrument'].save()
        pedal = form['pedal'].save()
        amp = form['amp'].save()

        tone.instrument.add(instrument)
        tone.pedal.set(pedal)
        tone.amp.add(amp)

        tone.save()

        return redirect(self.get_success_url())
