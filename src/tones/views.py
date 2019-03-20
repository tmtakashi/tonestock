from django.shortcuts import render
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.shortcuts import redirect

from .forms import ToneCreationMultiForm


def tone_create_view(request):
    if request.method == 'GET':
        formset = ToneCreationMultiForm(request.GET or None)
    elif request.method == 'POST':
        formset = ToneCreationMultiForm(request.POST)
        if formset.is_valid():
            tone = formset['tone'].save()

            instrument = formset['instrument'].save()
            pedal = formset['pedal'].save()
            amp = formset['amp'].save()

            tone.instrument.add(instrument)
            tone.pedal.set(pedal)
            tone.amp.add(amp)

            tone.save()
        return redirect('home')

    return render(request, 'tones/add_tone.html', {'formset': formset})
