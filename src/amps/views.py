from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView

from .models import Amp
from .forms import AmpForm


class CreateAmpView(CreateView):
    model = Amp
    form_class = AmpForm
    template_name = 'amps/add_amp.html'
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        self.object = form.save()
        self.object.owner = self.request.user
        return super().form_valid(form)


class AmpDetailView(DetailView):
    model = Amp
    context_object_name = "gear"
