from django.urls import path

from .views import tone_create_view, ToneListView
app_name = 'tones'

urlpatterns = [
    path('add_tone/', tone_create_view, name='add_tone'),
    path('list/', ToneListView.as_view(), name='tone_list')
]
