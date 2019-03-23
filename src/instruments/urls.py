from django.urls import path

from .views import CreateInstrumentView, InstrumentDetailView
app_name = 'instruments'

urlpatterns = [
    path('add/', CreateInstrumentView.as_view(), name='add_instrument'),
    path('<int:pk>/', InstrumentDetailView.as_view(), name='detail'),
]
