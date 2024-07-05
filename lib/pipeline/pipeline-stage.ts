import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { AirbnbSharedStack } from "../../lib/infra/cognitostack";

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new AirbnbSharedStack(this, "AirbnbSharedStack", {
      // Add any required properties here
    });
  }
}
