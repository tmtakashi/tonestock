from django.views import generic


class HomePageView(generic.TemplateView):
    template_name = 'home.html'


def add_gear_view(request):
    return request
