import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  CodePipeline,
  ShellStep,
  CodePipelineSource,
  ManualApprovalStep,
} from "aws-cdk-lib/pipelines";
import { PipelineStage } from "../pipeline/pipeline-stage";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Retrieve the GitHub token from Secrets Manager
    const githubToken = secretsmanager.Secret.fromSecretNameV2(
      this,
      "GitHubToken",
      "github-token"
    );

    const pipeline = new CodePipeline(this, "Pipeline", {
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.gitHub("Tim275/airbnbcdk", "main", {
          authentication: githubToken.secretValue,
        }),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    const devStage = pipeline.addStage(
      new PipelineStage(this, "PipelineDevStage", {
        stageName: "dev",
      })
    );

    const prodStage = pipeline.addStage(
      new PipelineStage(this, "PipelineProdStage", {
        stageName: "prod",
      })
    );

    devStage.addPost(new ManualApprovalStep("ManualApprovalBeforeProduction"));
  }
}
