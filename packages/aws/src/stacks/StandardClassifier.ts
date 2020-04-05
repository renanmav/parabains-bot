import * as CDK from '@aws-cdk/core'
import * as Lambda from '@aws-cdk/aws-lambda'
import * as ApiGateway from '@aws-cdk/aws-apigateway'

export class StandardClassifierStack extends CDK.Stack {
  constructor(app: CDK.App, id: string, props: CDK.StackProps) {
    super(app, id, props)

    const standardClassifier = new Lambda.Function(
      this,
      'ParabainsBotStandardClassifierFunction',
      {
        description:
          'Lambda Function that runs birthday predictions for standard module',
        code: Lambda.Code.fromAsset('../standard-classifier/dist', {
          exclude: ['*.tar.gz', '*.zip'],
        }),
        handler: 'aws.handler',
        runtime: Lambda.Runtime.PYTHON_3_7,
        memorySize: 512,
        timeout: CDK.Duration.seconds(15),
        tracing: Lambda.Tracing.ACTIVE,
      },
    )

    const api = new ApiGateway.RestApi(
      this,
      'ParabainsBotStandardClassifierApiGateway',
    )
    const integration = new ApiGateway.LambdaIntegration(standardClassifier)

    const root = api.root
    const path = api.root.addResource('{proxy+}')

    root.addMethod('ANY', integration)
    path.addMethod('ANY', integration)
  }
}
