from django.urls import path

from .views import CreateAmpView, AmpDetailView, UpdateAmpView, DeleteAmpView
app_name = 'amps'

urlpatterns = [
    path('add/', CreateAmpView.as_view(), name='add_amp'),
    path('<int:pk>/', AmpDetailView.as_view(), name="detail"),
    path('<int:pk>/edit/', UpdateAmpView.as_view(), name='edit_amp'),
    path('<int:pk>/delete/', DeleteAmpView.as_view(), name='delete_amp'),
]
