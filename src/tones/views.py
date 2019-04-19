import json

from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import Http404
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.generic import ListView, DetailView, DeleteView, View, TemplateView
from django.views.decorators.csrf import csrf_protect
from django.urls import reverse, reverse_lazy
from django.shortcuts import redirect, get_object_or_404

from instruments.models import Instrument
from amps.models import Amp
from .models import Tone
from .view_model import ToneMapper

User = get_user_model()


@csrf_protect
def tone_create_view(request):
    user_id = request.user.id
    if request.method == 'POST':
        info = json.loads(request.body.decode('utf-8'))
        print(info)
        tone = Tone(
            author=User(pk=user_id),
            info=info
        )
        tone.save()

        return JsonResponse({
            'redirect_url': reverse('tones:user_tone_list')
        })

    return render(request, 'tones/add_tone.html')


@csrf_protect
def tone_edit_view(request, pk):
    tone = get_object_or_404(Tone, pk=pk)
    tone_info = tone.info
    tone_info['pk'] = pk
    if request.method == 'POST':
        new_info = json.loads(request.body.decode('utf-8'))
        tone.info = new_info
        tone.save()

        return JsonResponse({
            'redirect_url': reverse('tones:user_tone_list')
        })

    return render(request, 'tones/edit_tone.html', {'tone_info': json.dumps(tone_info)})


class UserToneListView(TemplateView):
    template_name = 'tones/user_tone_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        tones = Tone.objects.filter(
            author=self.request.user).order_by('-updated_at')

        tone_list = [ToneMapper(tone).as_dict()
                     for tone in tones]
        context['tone_list'] = json.dumps({
            "tones": tone_list
        }, ensure_ascii=False)
        return context


class ToneListView(ListView):
    model = Tone
    template_name = 'tones/tone_list.html'

    def get_queryset(self):
        return super().get_queryset().order_by('-updated_at')


class ToneDetailView(DetailView):
    model = Tone
    template_name = 'tones/tone_detail.html'


@csrf_protect
def delete_tone(request, pk):
    if request.method == 'POST':
        Tone.objects.filter(pk=pk).delete()
        return JsonResponse({
            'success': True
        })
    else:
        render(reverse('user_gear_list'))


@login_required
def favorite_toggle(request, pk):
    tone = Tone.objects.get(pk=pk)
    favorites_list = request.user.profile.favorite_tone.all()
    if tone in favorites_list:
        # お気に入り一覧にあれば解除
        request.user.profile.favorite_tone.remove(tone)
        message = "お気に入り解除しました"
        command = "unfav"
    else:
        # お気に入り一覧になければ追加
        request.user.profile.favorite_tone.add(tone)
        message = "お気に入り登録しました"
        command = "fav"
    # ボタンに対応するプリセットのお気に入り数
    num_fav = len(tone.fav_by.all())
    data = {
        "message": message,
        "command": command,
        "num_fav": num_fav,
    }
    return JsonResponse(data)
