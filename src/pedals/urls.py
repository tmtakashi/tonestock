from django.urls import path

from .views import CreatePedalView, PedalDetailView
app_name = 'pedals'

urlpatterns = [
    path('add/', CreatePedalView.as_view(), name='add_pedal'),
    path('<int:pk>/', PedalDetailView.as_view(), name='detail'),
]
