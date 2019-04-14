from django.urls import path

from .views import add_amp, edit_amp, delete_amp, AmpDetailView
app_name = 'amps'

urlpatterns = [
    path('add/', add_amp, name='add_amp'),
    path('<int:pk>/', AmpDetailView.as_view(), name="detail"),
    path('<int:pk>/edit/', edit_amp, name='edit_amp'),
    path('<int:pk>/delete/', delete_amp, name='delete_amp'),
]
