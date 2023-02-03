import {ThumbnailService} from "../service/ThumbnailService";
import {Env} from "../lib/env";
const destinationBucket = Env.get('DESTINATION_BUCKET')

export async function handler(event: any) {
    console.log(JSON.stringify(event))
    // const thumnail = new ThumbnailService()
    // const result = await thumnail.createThumbnail({
    //     destinationBucket: destinationBucket,
    //     destinationKey: "thumbnail/Screen Shot 2022-11-06 at 11.53.42 PM.png",
    //     destinationWidth: 200,
    //     sourceBucket: "todo-photos-120acb2ea075",
    //     sourceKey: "private/us-east-1:1552d754-4ed3-44d9-a747-a8b530280181/Screen Shot 2022-11-06 at 11.53.42 PM.png"
    // })
    // console.log(JSON.stringify(result))

}

// Process:
// {
//     "Records": [
//     {
//         "eventVersion": "2.1",
//         "eventSource": "aws:s3",
//         "awsRegion": "us-east-1",
//         "eventTime": "2023-01-12T00:19:36.139Z",
//         "eventName": "ObjectCreated:Put",
//         "userIdentity": {
//             "principalId": "AWS:AIDAQ2VIDZBLM7VIEPFPA"
//         },
//         "requestParameters": {
//             "sourceIPAddress": "142.115.138.210"
//         },
//         "responseElements": {
//             "x-amz-request-id": "FQMJ8MEH1N78BB2W",
//             "x-amz-id-2": "r69MJvNrVOgCBhJBA/crxxuqHPMQ7gmhaGgDAFp+oPjwXWe1G8Y4SX84FDyIYIpSvzBuhBOBtLpM1kWsas3xq6irZXZg9ZwB"
//         },
//         "s3": {
//             "s3SchemaVersion": "1.0",
//             "configurationId": "8118de97-2801-42f0-bdc2-4e749cfb1f9d",
//             "bucket": {
//                 "name": "todo-photos-120acb2ea075",
//                 "ownerIdentity": {
//                     "principalId": "A30ML2YO3F37Z3"
//                 },
//                 "arn": "arn:aws:s3:::todo-photos-120acb2ea075"
//             },
//             "object": {
//                 "key": "test.png",
//                 "size": 483538,
//                 "eTag": "2337e13c9b119346e47b9bd291269bde",
//                 "sequencer": "0063BF52180B555613"
//             }
//         }
//     }
// ]
// }

