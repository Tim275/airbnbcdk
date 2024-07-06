import { Stack, StackProps, RemovalPolicy } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Table,
  AttributeType,
  BillingMode,
  StreamViewType,
  ProjectionType,
} from "aws-cdk-lib/aws-dynamodb";
import * as appsync from "aws-cdk-lib/aws-appsync";

export class AirbnbDatabaseStack extends Stack {
  // space
  public readonly airbnbDatabase: Table;
  public readonly airbnbGraphqlApi: appsync.GraphqlApi;
  /// space

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.airbnbDatabase = new Table(this, "airbnbDynamoDbTable", {
      tableName: "airbnbDynamoDBDatabaseTable",
      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.airbnbDatabase.addGlobalSecondaryIndex({
      indexName: "getAllApartmentsPerUser",
      partitionKey: {
        name: "GSI1PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "GSI1SK",
        type: AttributeType.STRING,
      },
      projectionType: ProjectionType.ALL,
    });
  }
}

/* 
+------------------------------------------------+
|              airbnbDynamoDBDatabaseTable       |
|------------------------------------------------|
|  PK (Partition Key)   |  SK (Sort Key)         |
|------------------------------------------------|
|  User#123             |  Apartment#456         |
|  User#123             |  Apartment#789         |
|  User#124             |  Apartment#321         |
|  ...                  |  ...                   |
+------------------------------------------------+

Global Secondary Index: getAllApartmentsPerUser, to get all Apartments for user
+------------------------------------------------+
|  GSI1PK (Partition Key)   |  GSI1SK (Sort Key) |
|------------------------------------------------|
|  User#123                 |  Apartment#456     |
|  User#123                 |  Apartment#789     |
|  User#124                 |  Apartment#321     |
|  ...                      |  ...               |
+------------------------------------------------+

*/
