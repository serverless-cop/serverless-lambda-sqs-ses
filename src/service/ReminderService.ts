import { DocumentClient, ScanInput } from 'aws-sdk/clients/dynamodb'
import { v4 as uuidv4 } from 'uuid'
import {ExternalError} from "../lib/error";
import {SES, SNS} from "aws-sdk";
import {aws_sns} from "aws-cdk-lib";

interface ReminderServiceProps{

}

interface EmailProps{
    SESRegion: string
    fromAddress: string
    toName: string
    toAddresses: string[]
    message: string
}

interface SMSProps{
    SNSRegion: string
    phoneNumber: string
    message: string
}

export class ReminderService {

    private props: ReminderServiceProps

    public constructor(props: ReminderServiceProps){
        this.props = props
    }

    public async sendEmail(props: EmailProps): Promise<boolean> {
        const ses = new SES({region: props.SESRegion})
        await ses.sendEmail(this.sendEmailParams(props)).promise()

        return true
    }

    private sendEmailParams(props: EmailProps) {
        return {
            Destination: {
                ToAddresses: props.toAddresses,
            },
            Message: {
                Body: {
                    Html: {
                        Charset: 'UTF-8',
                        Data: this.getHtmlContent(props),
                    },
                    Text: {
                        Charset: 'UTF-8',
                        Data: this.getTextContent(props),
                    },
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `Email from example ses app.`,
                },
            },
            Source: props.fromAddress,
        }

    }

    getHtmlContent(props: EmailProps) {
        return `
            <html>
              <body>
                <h1>Received an Email. 📬</h1>
                <h2>Sent from: ${props.fromAddress}</h2>
                <ul>
                  <li style="font-size:18px">👤 <b>${props.toName}</b></li>
                  <li style="font-size:18px">✉️ <b>${props.toAddresses[0]}</b></li>
                </ul>
                <p style="font-size:18px">${props.message}</p>
              </body>
            </html>
            `
    }

     getTextContent(props: EmailProps) {
        return `
            Received an Email. 📬
            Sent from:
                👤 ${props.toName}
                ✉️ ${props.toAddresses[0]}
                   ${props.message}
         `
    }

    public async sendSMS(props: SMSProps): Promise<boolean> {
        const sns = new SNS({region: props.SNSRegion})
        await sns.publish({
            Message: props.message,
            PhoneNumber: props.phoneNumber
        }).promise()
        return true
    }


}
