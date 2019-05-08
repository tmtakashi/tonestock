![logo](https://user-images.githubusercontent.com/38929720/56503196-b8dfb080-654f-11e9-9307-ecc28d646825.png)

A social media web app that manages your guitar/bass tones and gears.

Built with Django, Vue.js, Docker, and many more...

## 環境構築

```
git clone https://github.com/tmtakashi/tonestock.git
cd tonestock
docker-compose up -d
```
Access to http://127.0.0.1:80/

## 使用方法

### 会員登録

1. 「アカウント作成」をクリック
<img width="1440" alt="スクリーンショット 2019-04-25 16 07 39" src="https://user-images.githubusercontent.com/38929720/56716198-abefd680-6774-11e9-9aee-b0e0b6baf005.png">

2. ユーザー名、メールアドレス、プロフィール画像、パスワードなど必要な事項を記入（プロフィール画像は省略可）して「仮登録」をクリック
<img width="1440" alt="スクリーンショット 2019-04-25 16 14 02" src="https://user-images.githubusercontent.com/38929720/56716384-30425980-6775-11e9-8592-b9c3ff44614e.png">

3. 以下の画面が表示されたら、`docker-compose logs -f web`でDjangoの標準出力が表示されるので、記載されたURLにアクセスして本登録を完了させる。
<img width="1440" alt="スクリーンショット 2019-04-25 16 18 51" src="https://user-images.githubusercontent.com/38929720/56716659-daba7c80-6775-11e9-88bc-ff0842aefc7e.png">
<img width="703" alt="スクリーンショット 2019-04-25 16 20 09" src="https://user-images.githubusercontent.com/38929720/56716879-5a484b80-6776-11e9-94cf-c5b47d54a21e.png">

この画面が表示されればアカウント作成＆ログイン完了
<img width="1440" alt="スクリーンショット 2019-04-25 16 29 33" src="https://user-images.githubusercontent.com/38929720/56717319-5963e980-6777-11e9-8ac8-3381ddcbe838.png">

## 所有機材の追加

1. 「ユーザー名」 > 「マイ機材」をクリック
<img width="1440" alt="スクリーンショット 2019-04-25 16 32 13" src="https://user-images.githubusercontent.com/38929720/56717626-11919200-6778-11e9-863b-26941e70ca33.png">

2. 追加したい機材の横にある「+」をクリック
<img width="1440" alt="スクリーンショット 2019-04-25 16 36 47" src="https://user-images.githubusercontent.com/38929720/56717917-b7dd9780-6778-11e9-83a7-4f2e62f747a4.png">

3. フォームに機材の名前、ブランド、楽器の種類を入力して「追加」をクリックと機材が追加される。
<img width="1440" alt="スクリーンショット 2019-04-25 16 42 59" src="https://user-images.githubusercontent.com/38929720/56718168-39352a00-6779-11e9-921a-aafb732df7ed.png">
<img width="1440" alt="スクリーンショット 2019-04-25 16 43 47" src="https://user-images.githubusercontent.com/38929720/56718212-510cae00-6779-11e9-94cd-e91e9c03bcef.png">

## プリセット（音作り）の追加

1. 「プリセットを追加」をクリック
<img width="1440" alt="スクリーンショット 2019-04-25 16 47 13" src="https://user-images.githubusercontent.com/38929720/56718551-f162d280-6779-11e9-8347-06c9b1b8e873.png">

2. 「プリセット名」、「楽器」、「アンプ」それぞれの「編集」ボタンをクリックし、任意の設定に変える。アンプについては、パラメータを設定できるようになっているので、必要に応じて設定する。
<img width="1440" alt="スクリーンショット 2019-04-25 16 58 50" src="https://user-images.githubusercontent.com/38929720/56719373-8dd9a480-677b-11e9-97c0-c09945f4f6af.png">

3. 必要に応じてエフェクターも追加する。エフェクターの場合、「パラメータ追加」からパラメータを追加し、自分でパラメータの名前を入力して値を設定する。
<img width="1440" alt="スクリーンショット 2019-04-25 17 09 45" src="https://user-images.githubusercontent.com/38929720/56720084-f37a6080-677c-11e9-8b39-99c267dfe3fa.png">

4. ドラッグ&ドロップでエフェクターの並び順を変えることもできる。
<img width="1440" alt="スクリーンショット 2019-04-25 17 13 21" src="https://user-images.githubusercontent.com/38929720/56720443-ced2b880-677d-11e9-8a85-29e146120a1c.png">

5. プリセットが出来上がったら、「保存」をクリック
