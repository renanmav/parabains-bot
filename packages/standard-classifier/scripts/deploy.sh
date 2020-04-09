#! /usr/bin/env bash
set -ex

yarn workspace @parabains-bot/standard-classifier build

npm i --production

cp -r node_modules ./dist

# Setup Stack
yarn workspace @parabains-bot/aws deploy ParabainsBotStandardClassifier \
  -c pkg=standard-classifier \
  -c account='986732804710' \
  --require-approval=never \
  --profile=parabains-bot
