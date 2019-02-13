FROM python:latest
RUN mkdir /code \
ENV LANG en_US.utf8
WORKDIR /code
ADD requirements.txt /code
RUN pip install -r requirements.txt    # requirements.txtからパッケージのインストール
