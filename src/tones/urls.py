from django.urls import path

from .views import tone_create_view, tone_edit_view, user_tones, ToneListView, ToneDetailView, ToneDeleteView
app_name = 'tones'

urlpatterns = [
    path('add_tone/', tone_create_view, name='add_tone'),
    path('my_tones/', user_tones, name='user_tone_list'),
    path('all_tones/', ToneListView.as_view(), name='all_tone_list'),
    path('<int:pk>/detail/', ToneDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', tone_edit_view, name='edit_tone'),
    path('<int:pk>/delete/', ToneDeleteView.as_view(), name='delete')
]
