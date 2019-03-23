from django.urls import path

from .views import CreateInstrumentView
app_name = 'instruments'

urlpatterns = [
    path('add/', CreateInstrumentView.as_view(), name='add_instrument'),
]
