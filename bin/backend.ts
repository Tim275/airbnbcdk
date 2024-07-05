import { App } from "aws-cdk-lib";
import { AirbnbSharedStack } from "../lib/infra/cognitostack";
import { AirbnbDatabaseStack } from "../lib/infra/databasestack";
import { AirbnbApiStack } from "../lib/infra/appsyncstack";

const app = new App();

const sharedStack = new AirbnbSharedStack(app, "AirbnbSharedStack");
const databaseStack = new AirbnbDatabaseStack(app, "AirbnbDatabaseStack");

new AirbnbApiStack(app, "AirbnbApiStack", {
  userPool: sharedStack.userPool,
});

app.synth();
