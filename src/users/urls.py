from django.urls import path
from django.contrib.auth import views as auth_views

from .views import (
    signup_view,
    SignUpDoneView,
    SignUpCompleteView,
    edit_profile,
    UserDetailView,
    UserListView,
    ChangePasswordView,
    ChangePasswordDoneView,
    ResetPassword,
    ResetPasswordDone,
    ResetPasswordConfirm,
    ResetPasswordComplete,
    follow_toggle)
app_name = 'users'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('signup/', signup_view, name='signup'),
    path('signup/done', SignUpDoneView.as_view(), name='signup_done'),
    path('signup/complete/<token>/',
         SignUpCompleteView.as_view(), name='signup_complete'),
    path('change_password/', ChangePasswordView.as_view(), name="change_password"),
    path('change_password_done/', ChangePasswordDoneView.as_view(),
         name="change_password_done"),
    path('reset_password/', ResetPassword.as_view(), name="reset_password"),
    path('reset_password/done/', ResetPasswordDone.as_view(),
         name='reset_password_done'),
    path('reset_password/confirm/<uidb64>/<token>/',
         ResetPasswordConfirm.as_view(), name='reset_password_confirm'),
    path('reset_password/complete/', ResetPasswordComplete.as_view(),
         name='reset_password_complete'),
    path('edit/<int:pk>/', edit_profile, name='edit_profile'),
    path('list/', UserListView.as_view(), name='list'),
    path('detail/<int:pk>/', UserDetailView.as_view(), name='detail'),
    path('follow_toggle/<int:pk>', follow_toggle, name='follow_toggle'),
]
