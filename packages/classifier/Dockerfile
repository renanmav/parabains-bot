FROM python:3.7

RUN pip3 install pipenv

WORKDIR /usr/src/app

COPY Pipfile ./
COPY Pipfile.lock ./

RUN set -ex && pipenv install --system

COPY . .

CMD [ "python3", "./src/standard.py" ]