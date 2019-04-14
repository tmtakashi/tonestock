import json

from django.http.response import JsonResponse
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic import DetailView
from django.views.decorators.csrf import csrf_protect

from .models import Amp
from .forms import AmpForm


@csrf_protect
def add_amp(request):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        amp = Amp(
            owner=request.user,
            name=info['name'],
            brand=info['brand'],
            type=info['type']
        )

        amp.save()
        pk = amp.pk

        return JsonResponse({
            'pk': pk
        })
    else:
        render(reverse('user_gear_list'))


@csrf_protect
def edit_amp(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        amp = Amp.objects.filter(pk=pk)
        amp.update(
            name=info["name"],
            brand=info["brand"],
            type=info["type"]
        )
        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


@csrf_protect
def delete_amp(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        Amp.objects.filter(pk=pk).delete()
        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


class AmpDetailView(DetailView):
    model = Amp
    context_object_name = "gear"
