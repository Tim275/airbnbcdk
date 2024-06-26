import { AcmsSharedStack } from "./airbnb-shared-stack";
import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    /***********************************
     *    Instantiate the shared stack
     ***********************************/
    new AcmsSharedStack(this, "sharedStack", {
        stageName: props?.stageName as string,
      });
  }
}

