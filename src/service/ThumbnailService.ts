import { v4 as uuidv4 } from 'uuid'
import {S3} from "aws-sdk"
import sharp from "sharp"
import { createReadStream, createWriteStream } from 'fs'
import * as stream from "stream";

interface CreateThumbnailProps{
    sourceBucket: string
    destinationBucket: string
    sourceKey: string
    destinationKey: string
    destinationWidth: number
}

export class ThumbnailService {
    private s3 = new S3()

    public constructor(){

    }

    async createThumbnail(props: CreateThumbnailProps): Promise<any> {
        const typeMatch = props.sourceKey.match(/\.([^.]*)$/)
        if (!typeMatch) {
            console.log("Could not determine the image type.")
            return
        }

        const imageType = typeMatch[1].toLowerCase()
        if (imageType != "jpg" && imageType != "png") {
            console.log(`Unsupported image type: ${imageType}`)
            return
        }
        try {
            const params = {
                Bucket: props.sourceBucket,
                Key: props.sourceKey
            }
            let originalImageStream = this.s3.getObject(params).createReadStream()

            const pass = new stream.PassThrough()
            const destparams = {
                Bucket: props.destinationBucket,
                Key: props.destinationKey,
                ContentType: "image",
                Body: pass
            };
            const uploadResult = this.s3.upload(destparams).promise()

            let transformer = sharp()
                .resize(200, 200, {
                    fit: 'cover',
                    position: sharp.strategy.entropy,
                })
                .on('error', (err: Error) => {
                    console.log(err);
                })
            originalImageStream.pipe(transformer).pipe(pass)
            return uploadResult
        } catch (error) {
            console.log(error);
            return;
        }
    }
}
