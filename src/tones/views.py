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
        info = json.loads(request.body.decode('utf-8'))

        tone = Tone(
            author=User(pk=user_id),
            info=info
        )
        tone.save()

        return JsonResponse({
            'redirect_url': reverse('tones:user_tone_list')
        })

    return render(request, 'tones/add_tone.html')


def tone_edit_view(request, pk):
    tone = get_object_or_404(Tone, pk=pk)
    tone_info = tone.info
    tone_info['pk'] = pk
    if request.method == 'POST':
        new_info = json.loads(request.body.decode('utf-8'))
        tone.info = new_info
        tone.save()

        return JsonResponse({
            'redirect_url': reverse('tones:user_tone_list')
        })

    return render(request, 'tones/edit_tone.html', {'tone_info': json.dumps(tone_info)})


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
