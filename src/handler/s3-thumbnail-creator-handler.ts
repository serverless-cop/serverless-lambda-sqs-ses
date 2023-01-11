import {ThumbnailService} from "../service/ThumbnailService";
import {Env} from "../lib/env";
const destinationBucket = Env.get('DESTINATION_BUCKET')

export async function handler(event: any) {
    console.log(JSON.stringify(event))
    const thumnail = new ThumbnailService()
    const result = await thumnail.createThumbnail({
        destinationBucket: destinationBucket,
        destinationKey: "thumbnail/Screen Shot 2022-11-06 at 11.53.42 PM.png",
        destinationWidth: 200,
        sourceBucket: "todo-photos-120acb2ea075",
        sourceKey: "private/us-east-1:1552d754-4ed3-44d9-a747-a8b530280181/Screen Shot 2022-11-06 at 11.53.42 PM.png"
    })
    console.log(JSON.stringify(result))
}
