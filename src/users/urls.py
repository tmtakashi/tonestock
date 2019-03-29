from django.urls import path
from django.contrib.auth import views as auth_views

from .views import signup_view, SignUpDoneView, SignUpCompleteView, UpdateProfileView
app_name = 'users'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', signup_view, name='signup'),
    path('signup/done', SignUpDoneView.as_view(), name='signup_done'),
    path('signup/complete/<token>/',
         SignUpCompleteView.as_view(), name='signup_complete'),
    path('edit/<int:pk>/', UpdateProfileView.as_view(), name='edit_profile'),
]
