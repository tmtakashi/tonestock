from django.urls import path

from .views import add_pedal, edit_pedal, delete_pedal, PedalDetailView
app_name = 'pedals'

urlpatterns = [
    path('add/', add_pedal, name='add_pedal'),
    path('<int:pk>/', PedalDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', edit_pedal, name='edit_pedal'),
    path('<int:pk>/delete/', delete_pedal, name='delete_pedal'),
]
