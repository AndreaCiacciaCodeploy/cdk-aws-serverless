#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkProjectStack } from '../lib/cdk-project-stack';

const app = new cdk.App();
new CdkProjectStack(app, 'cdk-aws-serverless', {
   stackName:'cdk-aws-serverless',
   env: {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    },
});
