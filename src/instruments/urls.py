from django.urls import path

from .views import add_instrument, edit_instrument, InstrumentDetailView, DeleteInstrumentView
app_name = 'instruments'

urlpatterns = [
    path('add/', add_instrument, name='add_instrument'),
    path('<int:pk>/', InstrumentDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', edit_instrument, name='edit_instrument'),
    path('<int:pk>/delete/', DeleteInstrumentView.as_view(),
         name='delete_instrument'),
]
