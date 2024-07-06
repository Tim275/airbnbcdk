import { App } from "aws-cdk-lib";
import { AirbnbSharedStack } from "../lib/infra/cognitostack";
import { AirbnbDatabaseStack } from "../lib/infra/databasestack";
import { AirbnbApiStack } from "../lib/infra/appsyncstack";
import { PipelineStage } from "../lib/pipeline/pipeline-stage"; // Adjust the import path as necessary
import { PipelineStack } from "../lib/pipeline/pipeline-stack"; // Adjust the import path as necessary
//import * as dotenv from "dotenv";
import { UserStack } from "../lib/infra/user-stack";

const app = new App();
// Initialize the AirbnbCloneStack
new PipelineStack(app, "PipelineStack");

const sharedStack = new AirbnbSharedStack(app, "Cognitostack");
const databaseStack = new AirbnbDatabaseStack(app, "DatabaseStack");
const apiStack = new AirbnbApiStack(app, "AppsyncStack", {
  userPool: sharedStack.userPool,
});

// Initialize the UserStack, to create users
new UserStack(app, "UserStack", {
  airbnbGraphqlApi: apiStack.airbnbGraphqlApi,
  airbnbDatabase: databaseStack.airbnbDatabase,
});

app.synth();
