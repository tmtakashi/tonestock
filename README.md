# tonestock
a web app that manages your tones and gears

## 環境構築

```
git clone https://github.com/tmtakashi/tonestock.git
cd tonestock
docker-compose up -d
```
Access to http://0.0.0.0:8000/

## 本登録メールの確認方法
`docker-compose log -f web`でDjangoのコンソール画面が表示されるので、記載されたURLにアクセスして本登録を完了させる。
