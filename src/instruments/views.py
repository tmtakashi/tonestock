import json

from django.http.response import JsonResponse
from django.urls import reverse_lazy, reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from django.views.generic import DetailView

from .models import Instrument
from .forms import InstrumentForm


@csrf_protect
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
        pk = instrument.pk

        return JsonResponse({
            'pk': pk
        })
    else:
        render(reverse('user_gear_list'))


@csrf_protect
def edit_instrument(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        instrument = Instrument.objects.filter(pk=pk)
        instrument.update(
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
def delete_instrument(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        Instrument.objects.filter(pk=pk).delete()
        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


class InstrumentDetailView(DetailView):
    model = Instrument
    context_object_name = "gear"
