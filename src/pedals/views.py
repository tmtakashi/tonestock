from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from .models import Pedal
from .forms import PedalForm


class CreatePedalView(CreateView):
    model = Pedal
    form_class = PedalForm
    template_name = 'pedals/add_pedal.html'
    success_url = reverse_lazy('user_gear_list')

    def form_valid(self, form):
        self.object = form.save()
        self.object.owner = self.request.user
        return super().form_valid(form)


class UpdatePedalView(UpdateView):
    model = Pedal
    form_class = PedalForm
    template_name = 'pedals/edit_pedal.html'

    def get_success_url(self, **kwargs):
        return reverse_lazy("pedals:detail", args=(self.object.pk,))


class DeletePedalView(DeleteView):
    model = Pedal
    success_url = reverse_lazy('user_gear_list')


class PedalDetailView(DetailView):
    model = Pedal
    context_object_name = "gear"
