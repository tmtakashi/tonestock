from django.urls import path

from .views import ToneCreateView
app_name = 'tones'

urlpatterns = [
    path('add_tone/', ToneCreateView.as_view(), name='add_tone'),
]
