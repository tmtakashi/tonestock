from django.urls import path

from .views import tone_create_view
app_name = 'tones'

urlpatterns = [
    path('add_tone/', tone_create_view, name='add_tone'),
]
