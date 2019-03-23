from django.contrib.auth import get_user_model
from django.http import Http404
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from django.urls import reverse_lazy
from django.shortcuts import redirect

from .models import Tone
from .forms import ToneCreationMultiForm


def tone_create_view(request):
    user = request.user
    if request.method == 'GET':
        formset = ToneCreationMultiForm(request.GET or None)
    elif request.method == 'POST':
        formset = ToneCreationMultiForm(request.POST)
        if formset.is_valid():
            tone = formset['tone'].save(commit=False)
            tone.author = user
            tone.save()

            instrument = formset['instrument'].save()
            pedal = formset['pedal'].save()
            amp = formset['amp'].save()

            tone.instrument.add(instrument)
            tone.pedal.add(pedal)
            tone.amp.add(amp)

            tone.save()
        return redirect('home')

    return render(request, 'tones/add_tone.html', {'formset': formset})


def user_tones(request):
    user = request.user
    template = 'tones/user_tone_list.html'
    user_tones = Tone.objects.filter(
        author=request.user)
    return render(request, template, {'user_tones': user_tones, 'user': user})


class ToneListView(ListView):
    model = Tone
    template_name = 'tones/tone_list.html'


class ToneDetailView(DetailView):
    model = Tone
    template_name = 'tones/tone_detail.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['instruments'] = self.object.instrument.all()
        context['pedals'] = self.object.pedal.all()
        context['amps'] = self.object.amp.all()
        return context
