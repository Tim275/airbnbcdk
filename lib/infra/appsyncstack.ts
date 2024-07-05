import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { UserPool } from "aws-cdk-lib/aws-cognito";

interface AirbnbApiStackProps extends StackProps {
  userPool: UserPool;
}

export class AirbnbApiStack extends Stack {
  public readonly airbnbGraphqlApi: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: AirbnbApiStackProps) {
    super(scope, id, props);

    this.airbnbGraphqlApi = new appsync.GraphqlApi(this, "Api", {
      name: "airbnb",
      schema: appsync.SchemaFile.fromAsset("schema/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool: props.userPool,
            },
          },
        ],
      },
      xrayEnabled: true,
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
    });
  }
}
