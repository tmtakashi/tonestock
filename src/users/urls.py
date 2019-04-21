from django.urls import path
from django.contrib.auth import views as auth_views

from .views import (
    signup_view,
    SignUpDoneView,
    SignUpCompleteView,
    edit_profile,
    UserDetailView,
    UserListView,
    follow_toggle)
app_name = 'users'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', signup_view, name='signup'),
    path('signup/done', SignUpDoneView.as_view(), name='signup_done'),
    path('signup/complete/<token>/',
         SignUpCompleteView.as_view(), name='signup_complete'),
    path('edit/<int:pk>/', edit_profile, name='edit_profile'),
    path('list/', UserListView.as_view(), name='list'),
    path('detail/<int:pk>/', UserDetailView.as_view(), name='detail'),
    path('follow_toggle/<int:pk>', follow_toggle, name='follow_toggle'),
]
