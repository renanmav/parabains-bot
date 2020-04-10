#! /usr/bin/env bash
set -ex

yarn workspace @parabains-bot/standard build

# Setup Stack
yarn workspace @parabains-bot/aws deploy ParabainsBotStandard \
  -c pkg=standard \
  -c account='986732804710' \
  --require-approval=never \
  --profile=parabains-bot
