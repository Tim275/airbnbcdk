import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { AttributeType, BillingMode, ProjectionType, StreamViewType, Table } from "aws-cdk-lib/aws-dynamodb";
import { readFileSync } from "fs";

// Extend StackProps to include stageName
interface SharedStackProps extends StackProps {
  stageName?: string;
}

export class AcmsSharedStack extends Stack { 
  public readonly acmsDatabase: Table;
  public readonly acmsGraphqlApi: appsync.GraphqlApi;
  public readonly apiSchema: appsync.CfnGraphQLSchema;

  constructor(scope: Construct, id: string, props?: SharedStackProps) {
    super(scope, id, props);

    // Define resources here
  }
}