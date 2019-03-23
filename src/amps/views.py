from django.urls import reverse_lazy
from django.views.generic import CreateView

from .models import Amp
from .forms import AmpForm


class CreateAmpView(CreateView):
    model = Amp
    form_class = AmpForm
    template_name = 'amps/add_amp.html'
    success_url = reverse_lazy('home')
