import { sesClient } from '../../clients/SES-client';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import fs from "fs";
import CustomError from '../../../utils/CustomError';

export class SendEmail {
  constructor(private subject: string, private template: string) { }

  async send(reciver: string[]) {
    const params = {
      Source: "Antonio Edilberto <antoniovs420@gmail.com>",
      Destination: {
        CcAddresses: ["antoniovs420@gmail.com"],
        ToAddresses: reciver,
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: this.template,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: this.subject,
        },
      }
    }
    try {
      const data = await sesClient.send(new SendEmailCommand(params))
      return data
    } catch (err) {
      throw new CustomError("Email invalid", 500);
    }
  }
}
