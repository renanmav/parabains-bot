#! /usr/bin/env bash
set -ex

rm -rf dist

pipenv lock -r > requirements.txt

pip3 install -r requirements.txt --no-deps --target ./dist

# pipenv run pip3 install -r <(pipenv lock -r) --target dist

cp aws.py model.pkl ./dist

# Setup Stack
yarn workspace @parabains-bot/aws deploy ParabainsBotStandardClassifier \
  -c pkg=standard-classifier \
  -c account='986732804710' \
  --require-approval=never \
  --profile=parabains-bot
