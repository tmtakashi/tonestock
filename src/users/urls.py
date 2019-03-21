from django.urls import path
from django.contrib.auth import views as auth_views

from .views import SignUpView, SignUpDoneView, SignUpCompleteView
app_name = 'users'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('signup/done', SignUpDoneView.as_view(), name='signup_done'),
    path('signup/complete/<token>/',
         SignUpCompleteView.as_view(), name='signup_complete'),
]
