import * as CDK from '@aws-cdk/core'
import * as Lambda from '@aws-cdk/aws-lambda'
import * as SSM from '@aws-cdk/aws-ssm'

export class StandardStack extends CDK.Stack {
  constructor(app: CDK.App, id: string, props: CDK.StackProps) {
    super(app, id, props)

    const environment = {
      PREDICT_URL: SSM.StringParameter.valueForStringParameter(
        this,
        'StandardClassifierApiUrl',
      ),
      THRESHOLD: '0.7',
    }

    new Lambda.Function(this, 'ParabainsBotStandardFunction', {
      description: 'Lambda Function that constrols the twitter account',
      code: Lambda.Code.fromAsset('../standard/dist'),
      handler: 'main.handler',
      runtime: Lambda.Runtime.NODEJS_12_X,
      memorySize: 128,
      timeout: CDK.Duration.seconds(15),
      functionName: 'standard',
      environment,
    })
  }
}
