import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline,
  ShellStep,
  CodePipelineSource,
  ManualApprovalStep, // Added import for ManualApprovalStep
} from 'aws-cdk-lib/pipelines';
import { Stack, StackProps } from "aws-cdk-lib";
import { PipelineStage } from "./pipeline-stage";

export class AirbnbCloneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Initialize the pipeline
    const pipeline = new CodePipeline(this, 'Pipeline', {
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub("Tim275/airbnbcdk", "main"),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    // Add development stage to the pipeline
    const devStage = pipeline.addStage(new PipelineStage(this, "PipelineDevStage", {
      stageName: "dev",
    }));

    // Add production stage to the pipeline
    const prodStage = pipeline.addStage(new PipelineStage(this, "PipelineProdStage", {
      stageName: "prod",
    }));

    // Add manual approval step before production deployment
    devStage.addPost(new ManualApprovalStep("ManualApprovalBeforeProduction"));
  }
}