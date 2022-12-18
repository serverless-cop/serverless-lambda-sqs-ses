import {Construct} from "constructs";
import { GenericAsyncFunction } from "../generic/GenericAsyncFunction";
export interface TodoApiProps {

}

export class TodoAync extends GenericAsyncFunction {


    public constructor(scope: Construct, id: string, props: TodoApiProps) {
        super(scope, id)

    }




}
