import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Stack} from "aws-cdk-lib";
import {TodoAyncFunction} from "../lib/construct/todo-aync-function";
import {TodoAsyncAppStatefulStack} from "./todo-async-app-stateful-stack";


export interface TodoAppProps{
  todoAppStatefulStack: TodoAsyncAppStatefulStack
}

export class TodoAsyncAppStack extends Stack {

  public todoApis:TodoAyncFunction

  constructor(scope: Construct, id: string, todoAppProps: TodoAppProps, props?: cdk.StackProps) {
    super(scope, id, props);
    this.todoApis = new TodoAyncFunction(this,id, {
      queque: todoAppProps.todoAppStatefulStack.queque,
      thumbnailImageBucket: todoAppProps.todoAppStatefulStack.destinationBucket
    })
  }

}
