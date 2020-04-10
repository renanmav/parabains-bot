#!/usr/bin/env node
import * as cdk from '@aws-cdk/core'

import { StandardStack } from './stacks/Standard'
import { StandardClassifierStack } from './stacks/StandardClassifier'
import { UploadStandardClassifierModelStack } from './stacks/UploadStandardClassifierModel'

const PACKAGES = {
  STANDARD: 'standard',
  STANDARD_CLASSIFIER: 'standard-classifier',
  UPLOAD_STANDARD_CLASSIFIER: 'standard-classifier-upload',
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
    case PACKAGES.UPLOAD_STANDARD_CLASSIFIER:
      const uploadStandardClassifierModelStackName = `ParabainsBotUploadStandardClassifierModel`
      const uploadStandardClassifierModelConfig = {
        name: uploadStandardClassifierModelStackName,
        env: {
          account,
          region: 'us-east-1',
        },
      }
      new UploadStandardClassifierModelStack(
        app,
        uploadStandardClassifierModelStackName,
        uploadStandardClassifierModelConfig,
      )
      break
    case PACKAGES.STANDARD:
      const standardStackName = `ParabainsBotStandard`
      const standardConfig = {
        name: standardStackName,
        env: {
          account,
          region: 'us-east-1',
        },
      }
      new StandardStack(app, standardStackName, standardConfig)
      break
    default:
      throw new Error(`Deployment not found for package "${pkg}"`)
  }

  app.synth()
}

;(() => {
  run()
})()
