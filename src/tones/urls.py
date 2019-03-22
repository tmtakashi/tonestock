from django.urls import path

from .views import tone_create_view, user_tones
app_name = 'tones'

urlpatterns = [
    path('add_tone/', tone_create_view, name='add_tone'),
    path('my_tones/', user_tones, name='user_tone_list')
]
