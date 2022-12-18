import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {Stack} from "aws-cdk-lib";
import {TodoAync} from "../lib/construct/todo-aync";
import {TodoAppStatefulStack} from "./todo-app-stateful-stack";


export interface TodoAppProps{
  todoAppStatefulStack: TodoAppStatefulStack
}

export class TodoAppStack extends Stack {

  public todoApis:TodoAync

  constructor(scope: Construct, id: string, todoAppProps: TodoAppProps,  props?: cdk.StackProps) {
    super(scope, id, props);
    this.todoApis = new TodoAync(this,id, {

    })
  }


}
