from django.urls import reverse_lazy
from django.views.generic import CreateView

from .models import Pedal
from .forms import PedalForm


class CreatePedalView(CreateView):
    model = Pedal
    form_class = PedalForm
    template_name = 'pedals/add_pedal.html'
    success_url = reverse_lazy('home')
