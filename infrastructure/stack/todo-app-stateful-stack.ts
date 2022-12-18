import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CfnOutput, Fn, Stack} from "aws-cdk-lib";


export class TodoAppStatefulStack extends Stack {
    private suffix: string;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix()

    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        const Suffix = Fn.select(4, Fn.split('-', shortStackId));
        this.suffix = Suffix;
    }



}
