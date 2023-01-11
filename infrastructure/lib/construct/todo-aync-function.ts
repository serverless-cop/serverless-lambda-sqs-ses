import {Construct} from "constructs"
import { GenericAsyncFunction } from "../generic/GenericAsyncFunction"
import {Queue} from "aws-cdk-lib/aws-sqs/lib/queue";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import * as LambdaEventSources from 'aws-cdk-lib/aws-lambda-event-sources';
import {Bucket, EventType} from "aws-cdk-lib/aws-s3";

export interface TodoAsyncProps {
    queque: Queue
    thumbnailImageBucket: Bucket
}

export class TodoAyncFunction extends GenericAsyncFunction {

    todoFunctionAsync: NodejsFunction
    thumbnailCreator: NodejsFunction
    props: TodoAsyncProps

    public constructor(scope: Construct, id: string, props: TodoAsyncProps) {
        super(scope, id)
        this.props = props
        this.initialize()
        const queueEventSource = new LambdaEventSources.SqsEventSource(props.queque)
        // const imageBucketSource = new LambdaEventSources.S3EventSource(props.thumbnailImageBucket, {
        //     events: [EventType.OBJECT_CREATED]
        // })
        this.todoFunctionAsync.addEventSource(queueEventSource)
        // this.thumbnailCreator.addEventSource(imageBucketSource)
    }

    private initialize(){
        this.todoFunctionAsync = this.addFunction({
            functionName: 'todo-asnyc-process',
            handlerName: 'todo-sqs-async-handler.ts',
            environment: {

            },
        })

        this.thumbnailCreator = this.addFunction({
            functionName: 'thumbnail-creator',
            handlerName: 's3-thumbnail-creator-handler.ts',
            environment: {
                DESTINATION_BUCKET: this.props.thumbnailImageBucket.bucketName
            },
        })
    }
}
