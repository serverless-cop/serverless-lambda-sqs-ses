import {
    AuthorizationType,
    CognitoUserPoolsAuthorizer,
    JsonSchema,
    LambdaIntegration,
    Model,
    RequestValidator,
    RestApi
} from "aws-cdk-lib/aws-apigateway";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {join} from "path";
import config from "../../config/config";
import * as cdk from "aws-cdk-lib";
import {Construct} from "constructs";
import {Resource} from "aws-cdk-lib/aws-apigateway/lib/resource";
import {UserPool} from "aws-cdk-lib/aws-cognito";
import {Authorizer} from "aws-cdk-lib/aws-apigateway/lib/authorizer";

export interface Methodprops {
    functionName: string
    handlerName: string
    environment: any
}

export abstract class GenericAsyncFunction extends Construct {
    protected functions = new Map<string,NodejsFunction>()

    protected constructor(scope: Construct, id: string, props?: cdk.StackProps){
        super(scope, id);
    }

    protected addFunction(props: Methodprops): NodejsFunction{
        const apiId = config.account + '-' + config.env + '-' + props.functionName

        const lambda = new NodejsFunction(this, apiId, {
            entry: join(__dirname, '..', '..', '..','src', 'handler', props.handlerName),
            handler: 'handler',
            functionName: apiId,
            environment: props.environment
        })
        this.functions.set(apiId,lambda)
        return lambda;
    }

    public generateDocs(){
        // TODO
    }

}
