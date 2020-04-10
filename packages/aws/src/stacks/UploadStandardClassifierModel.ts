import * as CDK from '@aws-cdk/core'
import * as S3 from '@aws-cdk/aws-s3'
import * as S3Deployment from '@aws-cdk/aws-s3-deployment'

export class UploadStandardClassifierModelStack extends CDK.Stack {
  constructor(app: CDK.App, id: string, props: CDK.StackProps) {
    super(app, id, props)

    const bucket = new S3.Bucket(this, 'ParabainsBotBucket', {
      publicReadAccess: true,
      bucketName: 'parabains-bot',
    })

    new S3Deployment.BucketDeployment(this, 'ParabainsBotModelDeployment', {
      destinationBucket: bucket,
      sources: [
        S3Deployment.Source.asset('../standard-classifier/src/__generated__', {
          exclude: ['*.ts'],
        }),
      ],
    })
  }
}
