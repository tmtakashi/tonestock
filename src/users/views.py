from django.conf import settings
from django.contrib.auth import get_user_model, login
from django.contrib.sites.shortcuts import get_current_site
from django.core.signing import BadSignature, SignatureExpired, loads, dumps
from django.http import Http404, HttpResponseBadRequest
from django.shortcuts import redirect, render
from django.template.loader import get_template
from django.views import generic

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


class SignUpDoneView(generic.TemplateView):
    '''
    仮登録完了ページ
    '''
    template_name = 'users/signup_done.html'


class SignUpCompleteView(generic.TemplateView):
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
