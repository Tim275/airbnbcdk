import { App } from "aws-cdk-lib";
import { AirbnbSharedStack } from "../lib/infra/cognitostack";
import { AirbnbDatabaseStack } from "../lib/infra/databasestack";
import { AirbnbApiStack } from "../lib/infra/appsyncstack";
import { PipelineStage } from "../lib/pipeline/pipeline-stage"; // Adjust the import path as necessary
import { PipelineStack } from "../lib/pipeline/pipeline-stack"; // Adjust the import path as necessary
//import * as dotenv from "dotenv";

const app = new App();
// Initialize the AirbnbCloneStack
new PipelineStack(app, "PipelineStack");

const sharedStack = new AirbnbSharedStack(app, "Cognitostack");
const databaseStack = new AirbnbDatabaseStack(app, "DatabaseStack");
new AirbnbApiStack(app, "AppsyncStack", {
  userPool: sharedStack.userPool,
});

app.synth();
