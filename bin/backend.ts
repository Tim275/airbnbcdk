import { App } from "aws-cdk-lib";
import { AirbnbSharedStack } from "../lib/infra/cognitostack";
import { AirbnbDatabaseStack } from "../lib/infra/databasestack";
import { AirbnbApiStack } from "../lib/infra/appsyncstack";
import { PipelineStage } from "../lib/pipeline/pipeline-stage"; // Adjust the import path as necessary

const app = new App();

// Initialize the PipelineStage
new PipelineStage(app, "PipelineStage", {
  // Add any required properties here
});

const sharedStack = new AirbnbSharedStack(app, "AirbnbSharedStack");
const databaseStack = new AirbnbDatabaseStack(app, "AirbnbDatabaseStack");
new AirbnbApiStack(app, "AirbnbApiStack", {
  userPool: sharedStack.userPool,
});

app.synth();
