#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AirbnbCloneStack } from '../lib/airbnb_clone-stack';

const app = new cdk.App();
// pipelinestack
new AirbnbCloneStack(app, 'AirbnbCloneStack', {});