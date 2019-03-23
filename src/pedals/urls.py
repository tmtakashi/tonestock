from django.urls import path

from .views import CreatePedalView
app_name = 'pedals'

urlpatterns = [
    path('add/', CreatePedalView.as_view(), name='add_pedal'),
]
