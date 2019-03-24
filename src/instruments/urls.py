from django.urls import path

from .views import CreateInstrumentView, InstrumentDetailView, DeleteInstrumentView, UpdateInstrumentView
app_name = 'instruments'

urlpatterns = [
    path('add/', CreateInstrumentView.as_view(), name='add_instrument'),
    path('<int:pk>/', InstrumentDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', UpdateInstrumentView.as_view(), name='edit_instrument'),
    path('<int:pk>/delete/', DeleteInstrumentView.as_view(),
         name='delete_instrument'),
]
