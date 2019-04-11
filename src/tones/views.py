import json

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.generic import ListView, DetailView, DeleteView, View
from django.views.decorators.csrf import csrf_protect
from django.urls import reverse, reverse_lazy
from django.shortcuts import redirect, get_object_or_404

from instruments.models import Instrument
from amps.models import Amp
from .models import Tone

User = get_user_model()


@csrf_protect
def tone_create_view(request):
    user_id = request.user.id
    if request.method == 'POST':
        tone_info = json.loads(request.body.decode('utf-8'))

        tone = Tone(
            author=User(pk=user_id),
            tone_info=tone_info
        )
        tone.save()

        return redirect('tones:user_tone_list')

    return render(request, 'tones/add_tone.html')


def tone_edit_view(request, pk):
    tone = get_object_or_404(Tone, pk=pk)
    instance = {
        'tone': tone,
        'instrument': tone.instrument.all().first(),
        # Needs to be changed when adding multiple pedals
        'pedal': tone.pedal.all().first(),
        'amp': tone.amp.all().first()
    }
    if request.method == 'GET':
        formset = ToneCreationMultiForm(instance=instance)
    if request.method == "POST":
        formset = ToneCreationMultiForm(request.POST)
        if formset.is_valid():

            tone.name = formset['tone'].cleaned_data['name']

            instrument = formset['instrument'].save()
            pedal = formset['pedal'].save()
            amp = formset['amp'].save()

            tone.instrument.all().delete()
            tone.instrument.add(instrument)

            tone.pedal.all().delete()
            tone.pedal.add(pedal)

            tone.amp.all().delete()
            tone.amp.add(amp)

            tone.save()

        return redirect('tones:detail', pk=tone.pk)

    return render(request, 'tones/edit_tone.html', {'formset': formset})


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


class ToneDeleteView(DeleteView):
    model = Tone
    success_url = reverse_lazy('tones:user_tone_list')
