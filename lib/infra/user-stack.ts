import { Stack, StackProps } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { join } from "path";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { bundleAppSyncResolver } from "../infra/helper";

interface UserStackProps extends StackProps {
  airbnbGraphqlApi: appsync.GraphqlApi;
  airbnbDatabase: Table;
}

export class UserStack extends Stack {
  constructor(scope: Construct, id: string, props: UserStackProps) {
    super(scope, id, props);

    const { airbnbDatabase, airbnbGraphqlApi } = props;

    const airbnbDataSource = airbnbGraphqlApi.addDynamoDbDataSource(
      "airbnbdbs",
      airbnbDatabase
    );

    const airbnbUserFunction = new appsync.AppsyncFunction(
      this,
      "createUserAccount",
      {
        name: "createUserAccount",
        api: airbnbGraphqlApi,
        dataSource: airbnbDataSource,
        code: bundleAppSyncResolver("src/resolvers/user/createUser.ts"),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );

    new appsync.Resolver(this, "createUserResolver", {
      api: airbnbGraphqlApi,
      typeName: "Mutation",
      fieldName: "createUserAccount",
      code: appsync.Code.fromAsset(
        join(
          __dirname,
          "../infra/js_resolver/_before_and_after_mapping_template.js"
        )
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [airbnbUserFunction],
    });
  }
}
