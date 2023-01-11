import {
    Context,
    APIGatewayProxyResult,
    APIGatewayProxyEvent
} from 'aws-lambda';
import {getPathParameter, getQueryString} from "../lib/utils";


export async function handler(event: any) {
    console.log(JSON.stringify(event))
}
