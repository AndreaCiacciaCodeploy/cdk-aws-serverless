import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as path from 'path';

export class CdkProjectStack extends cdk.Stack {
   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      /// 1) definte api configuration
      const api = new apigateway.RestApi(this, 'api', {
         description: 'serverless project',
         deployOptions: {
            stageName: 'dev',
         },
         // enable cors
         defaultCorsPreflightOptions: {
            allowHeaders: [
               'Content-Type',
               'X-Amz-Date',
               'Authorization',
               'X-Api-Key',
            ],
            allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowCredentials: true,
            allowOrigins: ['*'],
         },
      });

      new cdk.CfnOutput(this, 'apiUrl', { value: api.url });

      // 2) define lambda function
      const lambdaFunction = new lambda.Function(this, 'lambda-function', {
         runtime: lambda.Runtime.NODEJS_16_X,
         handler: 'index.main',
         functionName: 'lambda-dynamodb',
         code: lambda.Code.fromAsset(path.join(__dirname, '/../src/')),
         currentVersionOptions: {
            codeSha256: process.env.RELEASE_VERSION
         }
      });

      lambdaFunction.currentVersion;

      // 3) add api gateway resource
      const addItem = api.root.addResource('additem');
      const getItem = api.root.addResource('getitem');

      // 4) add api method to resource
      addItem.addMethod(
         'GET',
         new apigateway.LambdaIntegration(lambdaFunction, { proxy: true }),
      );

      getItem.addMethod(
         'GET',
         new apigateway.LambdaIntegration(lambdaFunction, { proxy: true }),
      );

      // 5) add dynamodb table
      const table = new dynamodb.Table(this, 'dynamodb-table', {
         writeCapacity: 1,
         readCapacity: 1,
         tableName: 'MYTABLETEST',
         removalPolicy: cdk.RemovalPolicy.DESTROY,
         partitionKey: { name: 'ID', type: dynamodb.AttributeType.STRING },
      });

      table.grantWriteData(lambdaFunction);
      table.grantReadData(lambdaFunction);


   }
}
