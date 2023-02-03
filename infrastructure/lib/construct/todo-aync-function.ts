import {Construct} from "constructs"
import { GenericAsyncFunction } from "../generic/GenericAsyncFunction"
import {Queue} from "aws-cdk-lib/aws-sqs/lib/queue";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as LambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import {Bucket, EventType} from "aws-cdk-lib/aws-s3";
import {DynamoEventSource} from "aws-cdk-lib/aws-lambda-event-sources";
import {Table} from "aws-cdk-lib/aws-dynamodb";
import {StartingPosition} from "aws-cdk-lib/aws-lambda";
import config from "../../config/config";
import {Effect, PolicyStatement} from "aws-cdk-lib/aws-iam";

export interface TodoAsyncProps {
    queque: Queue
    thumbnailImageBucket: Bucket
}

export class TodoAyncFunction extends GenericAsyncFunction {

    todoFunctionAsync: NodejsFunction
    thumbnailCreator: NodejsFunction
    reminderCreator: NodejsFunction
    props: TodoAsyncProps

    public constructor(scope: Construct, id: string, props: TodoAsyncProps) {
        super(scope, id)
        this.props = props
        this.initialize()
        const queueEventSource = new LambdaEventSources.SqsEventSource(props.queque)

        // const imageBucketSource = new LambdaEventSources.S3EventSource(props.thumbnailImageBucket, {
        //     events: [EventType.OBJECT_CREATED]
        // })
        // this.todoFunctionAsync.addEventSource(queueEventSource)
        // this.thumbnailCreator.addEventSource(imageBucketSource)

        const importedTable = Table.fromTableAttributes(this, 'todoTableId', {
            tableArn: 'arn:aws:dynamodb:us-east-1:057260886102:table/057260886102-dev-Todo-120acb2ea075',
            tableStreamArn: 'arn:aws:dynamodb:us-east-1:057260886102:table/057260886102-dev-Todo-120acb2ea075/stream/2023-01-11T04:27:40.892'
        })

        // this.reminderCreator.addEventSource(new DynamoEventSource(
        //     importedTable , {
        //     startingPosition: StartingPosition.LATEST,
        // }));
    }

    private initialize(){
        this.todoFunctionAsync = this.addFunction({
            functionName: 'todo-asnyc-process',
            handlerName: 'todo-sqs-async-handler.ts',
            environment: {

            },
            externalModules: []
        })

        this.thumbnailCreator = this.addFunction({
            functionName: 'thumbnail-creator',
            handlerName: 's3-thumbnail-creator-handler.ts',
            environment: {
                DESTINATION_BUCKET: this.props.thumbnailImageBucket.bucketName
            },
            externalModules: ['sharp']
        })

        this.reminderCreator = this.addFunction({
            functionName: 'reminder-creator',
            handlerName: 'reminder-creator-handler.ts',
            environment: {
                SES_REGION: config.region,
                FROM_EMAIL_ADDRESS: `${config.fromEmailAddress}@${config.sesVerifiedDomain}`
            },
            externalModules: []
        })

        this.reminderCreator.addToRolePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'ses:SendEmail',
                    'ses:SendRawEmail',
                    'ses:SendTemplatedEmail',
                ],
                resources: [
                    `arn:aws:ses:${config.region}:${
                        config.account
                    }:identity/${config.sesVerifiedDomain}`,
                ],
            }),
        )

        this.reminderCreator.addToRolePolicy(
            new PolicyStatement({
                effect: Effect.ALLOW,
                actions: [
                    'sns:Publish',
                ],
                resources: ['*'],
            }),
        )

    }
}
