from django.urls import path

from .views import CreateAmpView
app_name = 'amps'

urlpatterns = [
    path('add/', CreateAmpView.as_view(), name='add_amp'),
]
