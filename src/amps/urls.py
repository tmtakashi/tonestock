from django.urls import path

from .views import CreateAmpView, AmpDetailView
app_name = 'amps'

urlpatterns = [
    path('add/', CreateAmpView.as_view(), name='add_amp'),
    path('<int:pk>/', AmpDetailView.as_view(), name="detail")
]
