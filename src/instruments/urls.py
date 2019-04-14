from django.urls import path

from .views import add_instrument, InstrumentDetailView, DeleteInstrumentView, UpdateInstrumentView
app_name = 'instruments'

urlpatterns = [
    path('add/', add_instrument, name='add_instrument'),
    path('<int:pk>/', InstrumentDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', UpdateInstrumentView.as_view(), name='edit_instrument'),
    path('<int:pk>/delete/', DeleteInstrumentView.as_view(),
         name='delete_instrument'),
]
