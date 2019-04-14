import json

from django.http.response import JsonResponse
from django.urls import reverse_lazy, reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_protect
from django.views.generic import DetailView

from .models import Pedal
from .forms import PedalForm


@csrf_protect
def add_pedal(request):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        pedal = Pedal(
            owner=request.user,
            name=info['name'],
            brand=info['brand'],
            type=info['type']
        )

        pedal.save()
        pk = pedal.pk

        return JsonResponse({
            'pk': pk
        })
    else:
        render(reverse('user_gear_list'))


@csrf_protect
def edit_pedal(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        pedal = Pedal.objects.filter(pk=pk)
        pedal.update(
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
def delete_pedal(request, pk):
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))

        Pedal.objects.filter(pk=pk).delete()
        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


class PedalDetailView(DetailView):
    model = Pedal
    context_object_name = "gear"
