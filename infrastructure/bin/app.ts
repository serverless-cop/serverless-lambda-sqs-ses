#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoAsyncAppStack } from '../stack/todo-async-app-stack';
import {TodoAsyncAppStatefulStack} from "../stack/todo-async-app-stateful-stack";

const app = new cdk.App();

const statefulStack = new TodoAsyncAppStatefulStack(app, 'TodoAsyncStatefulStack')
new TodoAsyncAppStack(app, 'TodoAsyncAppStack', {
    todoAppStatefulStack: statefulStack
});
