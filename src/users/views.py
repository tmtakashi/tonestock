from .forms import SignUpForm
from django.urls import reverse_lazy
from django.views import generic


class SignUpView(generic.CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy('users:login')
    template_name = 'users/signup.html'
