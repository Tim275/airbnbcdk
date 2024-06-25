import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  ShellStep,
  CodePipelineSource,
} from 'aws-cdk-lib/pipelines';

export class AirbnbCloneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the CodePipeline resource
    new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub(
          "Tim275/airbnbcdk",
          "main"
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });
  }
}
