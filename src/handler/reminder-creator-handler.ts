import {
    Context,
    APIGatewayProxyResult,
    APIGatewayProxyEvent
} from 'aws-lambda';
import {getPathParameter, getQueryString} from "../lib/utils";
import {DynamoDB} from "aws-sdk";
import {ReminderService} from "../service/ReminderService";

const reminderService = new ReminderService({})
import {Env} from "../lib/env";
const sesRegion = Env.get('SES_REGION')
const fromEmailAddress = Env.get('FROM_EMAIL_ADDRESS')

export async function handler(event: any) {
    console.log(JSON.stringify(event))
    console.log('////////////////')

    try{
        const unmarshalled = DynamoDB.Converter.unmarshall(event.Records[0].dynamodb.NewImage)
        console.log(JSON.stringify(unmarshalled))

        if(unmarshalled.email){
            await reminderService.sendEmail({
                SESRegion: sesRegion,
                fromAddress: fromEmailAddress,
                message: "Hi Behnam, \n Welcome to the Orbitstellar. You have a reminder for: \n " +
                    unmarshalled.name,
                toAddresses: [unmarshalled.email],
                toName: "Behnam"
            })
        }
        if(unmarshalled.phone){
            await reminderService.sendSMS({
                SNSRegion: sesRegion,
                message: "Hi, \n you have a reminder for: \n" +
                    unmarshalled.name,
                phoneNumber: unmarshalled.phone
            })
        }

    } catch (e) {
        console.error(e)
    }

}
// {
//     "Records": [
//     {
//         "eventID": "7892e31cdc0531e22e4a2c01d8fdec81",
//         "eventName": "MODIFY",
//         "eventVersion": "1.1",
//         "eventSource": "aws:dynamodb",
//         "awsRegion": "us-east-1",
//         "dynamodb": {
//             "ApproximateCreationDateTime": 1673480756,
//             "Keys": {
//                 "id": {
//                     "S": "d7a85571-f94f-4372-a190-f8cbbfd1e082"
//                 }
//             },
//             "NewImage": {
//                 "phone": {
//                     "S": ""
//                 },
//                 "name": {
//                     "S": "Pick up shirts"
//                 },
//                 "description": {
//                     "S": "I have to pick up my shirts from the dry cleaner near Lowblaws."
//                 },
//                 "id": {
//                     "S": "d7a85571-f94f-4372-a190-f8cbbfd1e082"
//                 },
//                 "reminderTime": {
//                     "S": "00:12"
//                 },
//                 "reminderDate": {
//                     "S": "2023-01-20"
//                 },
//                 "userId": {
//                     "S": "efee356a-fdf8-40d4-a9a4-99a2ba17b86a"
//                 },
//                 "email": {
//                     "S": "b.hajian@gmail.com"
//                 }
//             },
//             "OldImage": {
//                 "phone": {
//                     "S": ""
//                 },
//                 "name": {
//                     "S": "Pick up shirts"
//                 },
//                 "description": {
//                     "S": "I have to pick up my shirts from the dry cleaner near Lowblaws."
//                 },
//                 "id": {
//                     "S": "d7a85571-f94f-4372-a190-f8cbbfd1e082"
//                 },
//                 "reminderTime": {
//                     "S": ""
//                 },
//                 "reminderDate": {
//                     "S": ""
//                 },
//                 "userId": {
//                     "S": "efee356a-fdf8-40d4-a9a4-99a2ba17b86a"
//                 },
//                 "email": {
//                     "S": "b.hajian@gmail.com"
//                 }
//             },
//             "SequenceNumber": "34593200000000035440833947",
//             "SizeBytes": 501,
//             "StreamViewType": "NEW_AND_OLD_IMAGES"
//         },
//         "eventSourceARN": "arn:aws:dynamodb:us-east-1:057260886102:table/057260886102-dev-Todo-120acb2ea075/stream/2023-01-11T04:27:40.892"
//     }
// ]
// }
