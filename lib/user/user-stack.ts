import { Stack, StackProps } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { join } from "path";
import * as appsync from "aws-cdk-lib/aws-appsync";
//import { bundleAppSyncResolver } from "./helpers";

interface UserStackProps extends StackProps {
  airbnbGraphqlApi: appsync.GraphqlApi;
  airbnbDatabase: Table;
}
