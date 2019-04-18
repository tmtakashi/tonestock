# tonestock
a web app that manages your tones and gears

## Setup

### Postgresql
```
$ psql
# CREATE USER takashi-minagawa;
# CREATE DATABASE tonestock OWNER takashi-minagawa;
```

```
$ cd tonestock
$ pip install pipenv
$ pipenv install
$ pipenv shell
$ cd src
$ npm install
$ python manage.py migrate
$ python manage.py runserver
```
