from django.conf import settings
from django.contrib.auth import get_user_model, login
from django.contrib.auth.decorators import login_required
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.http import HttpResponseRedirect, Http404, HttpResponseBadRequest
from django.http.response import JsonResponse
from django.shortcuts import redirect, render
from django.template.loader import get_template
from django.views.generic import TemplateView, UpdateView, ListView, DetailView
from django.urls import reverse_lazy

from .models import Profile
from .forms import UserForm, ProfileForm

User = get_user_model()


def signup_view(request):
    user_form = UserForm(request.POST or None)
    profile_form = ProfileForm(request.POST or None)

    if request.method == "POST" and user_form.is_valid() and profile_form.is_valid():

        user = user_form.save(commit=False)
        user.is_active = False
        user.save()

        profile = profile_form.save(commit=False)
        profile.user = user
        profile.save()

        # アクティベーションURLの送付
        current_site = get_current_site(request)
        domain = current_site.domain
        context = {
            'protocol': request.scheme,
            'domain': domain,
            'token': dumps(user.pk),
            'user': user,
        }

        subject_template = get_template(
            'users/mail_template/signup/subject.txt')
        subject = subject_template.render(context)

        message_template = get_template(
            'users/mail_template/signup/message.txt')
        message = message_template.render(context)

        user.email_user(subject, message)

        return redirect('users:signup_done')

    context = {
        "user_form": user_form,
        "profile_form": profile_form,
    }
    return render(request, 'users/signup.html', context)


class SignUpDoneView(TemplateView):
    '''
    仮登録完了ページ
    '''
    template_name = 'users/signup_done.html'


class SignUpCompleteView(TemplateView):
    '''
    メール内URLアクセス後の本登録処理
    '''
    template_name = 'users/signup_complete.html'
    # デフォルトでは一日以内がアクティベーション期限
    timeout_seconds = getattr(settings, 'ACTIVATION_TIMEOUT_SECONDS', 60*60*24)

    def get(self, request, **kwargs):
        '''
        tokenが正しければ本登録
        '''
        token = kwargs.get('token')
        try:
            # tokenをuserのpkに復号化
            user_pk = loads(token, max_age=self.timeout_seconds)

        # 期限切れ
        except SignatureExpired:
            return HttpResponseBadRequest()

        # tokenが間違っている
        except BadSignature:
            return HttpResponseBadRequest()

        # tokenは問題なし
        else:
            try:
                user = User.objects.get(pk=user_pk)
            except User.DoesNotExist:
                return HttpResponseBadRequest()
            else:
                if not user.is_active:
                    # 問題ないので本登録
                    user.is_active = True
                    user.backend = 'django.contrib.auth.backends.ModelBackend'
                    login(request, user)
                    user.save()
                    return super().get(request, **kwargs)

        return HttpResponseBadRequest()


class UpdateProfileView(UpdateView):
    model = Profile
    form_class = ProfileForm
    template_name = 'users/edit_profile.html'
    success_url = reverse_lazy('home')


class UserDetailView(DetailView):
    model = User
    template_name = 'users/user_detail.html'


class UserListView(ListView):
    model = User
    template_name = "users/user_list.html"


@login_required
def follow_toggle(request, pk):
    user = User.objects.get(pk=pk)
    follows_list = request.user.profile.follows.all()
    if user.profile in follows_list:
        # フォロー一覧にいれば解除
        request.user.profile.follows.remove(user.profile)
        message = "フォロー解除しました"
        command = "unfollow"
    else:
        # フォロー一覧にいなければ追加
        request.user.profile.follows.add(user.profile)
        message = "フォローしました"
        command = "follow"
    # ボタンに対応するユーザーのフォロワー数
    num_follower = len(user.profile.followed_by.all())
    # ボタンに対応するユーザーのフォロー数
    num_follow = len(user.profile.follows.all())
    data = {
        "message": message,
        "command": command,
        "num_follower": num_follower,
    }
    return JsonResponse(data)
