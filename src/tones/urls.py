from django.urls import path

from .views import (
    tone_create_view,
    tone_edit_view,
    UserToneListView,
    ToneListView,
    ToneDetailView,
    delete_tone,
    favorite_toggle,
    post_comment
)

app_name = 'tones'

urlpatterns = [
    path('add_tone/', tone_create_view, name='add_tone'),
    path('my_tones/', UserToneListView.as_view(), name='user_tone_list'),
    path('all_tones/', ToneListView.as_view(), name='all_tone_list'),
    path('<int:pk>/detail/', ToneDetailView.as_view(), name='detail'),
    path('<int:pk>/edit/', tone_edit_view, name='edit_tone'),
    path('<int:pk>/delete/', delete_tone, name='delete'),
    path('favorite_toggle/<int:pk>', favorite_toggle, name='favorite_toggle'),
    path('comment/', post_comment, name="post_comment"),
]
