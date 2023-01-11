import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CfnOutput, Fn, Stack, aws_sqs as sqs, RemovalPolicy} from "aws-cdk-lib";
import {Queue} from "aws-cdk-lib/aws-sqs/lib/queue";
import {Bucket, HttpMethods} from "aws-cdk-lib/aws-s3";


export class TodoAsyncAppStatefulStack extends Stack {
    private suffix: string
    public queque: Queue
    public destinationBucket: Bucket

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        this.initializeSuffix()
        this.initializeComponents()
        this.initializeTodosPhotosBucket()
    }

    private initializeSuffix() {
        const shortStackId = Fn.select(2, Fn.split('/', this.stackId));
        const Suffix = Fn.select(4, Fn.split('-', shortStackId));
        this.suffix = Suffix;
    }

    private initializeComponents(){
        this.queque = new sqs.Queue(this, 'OurSqsQueueId', {
            removalPolicy: RemovalPolicy.DESTROY,
            queueName: 'OurSQSQueue-'+this.suffix,
        });
    }

    private initializeTodosPhotosBucket() {
        this.destinationBucket = new Bucket(this, 'thumbnail-image-id', {
            removalPolicy: RemovalPolicy.DESTROY,
            bucketName: 'thumbnail-image-' + this.suffix,
            cors: [{
                allowedMethods: [
                    HttpMethods.HEAD,
                    HttpMethods.GET,
                    HttpMethods.PUT
                ],
                allowedOrigins: ['*'],
                allowedHeaders: ['*']
            }]
        });
        new CfnOutput(this, 'thumbnail-image-bucket-name', {
            value: this.destinationBucket.bucketName
        })
    }
}
