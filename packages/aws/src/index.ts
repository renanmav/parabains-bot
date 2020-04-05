#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'

import { StandardClassifierStack } from './stacks/StandardClassifier'

const PACKAGES = {
  STANDARD_CLASSIFIER: 'standard-classifier',
  STANDARD: 'standard',
}
const allowedPackages = Object.values(PACKAGES)

function run() {
  const app = new cdk.App()

  const pkg = app.node.tryGetContext('pkg')
  if (!pkg || !allowedPackages.includes(pkg)) {
    throw new Error(`Invalid package "${pkg}"`)
  }

  const account = app.node.tryGetContext('account')
  if (!account) {
    throw new Error(`Invalid account "${account}"`)
  }

  switch (pkg) {
    case PACKAGES.STANDARD_CLASSIFIER:
      const standardClassifierStackName = `ParabainsBotStandardClassifier`
      const standardClassifierConfig = {
        name: standardClassifierStackName,
        env: {
          account,
          region: 'us-east-1',
        },
      }
      new StandardClassifierStack(
        app,
        standardClassifierStackName,
        standardClassifierConfig,
      )
      break
    default:
      throw new Error(`Deployment not found for package "${pkg}"`)
  }

  app.synth()
}

;(() => {
  run()
})()
