import { SendEmail } from "../../src/aws/services/SES/Ses.send-email"
import { sesClient } from "../../src/aws/clients/SES-client"

describe("#Test aws - SES service", () => {

  test("Should successfully mock SES-sendEmail", async () => {
    jest.spyOn(sesClient, "send")
      .mockImplementation(() => true)
    const sendEmail = new SendEmail('Teste', '<h1>teste</h1>')
    const emailParams = "antoniovs420@gmail.com"
    const data = await sendEmail.send([emailParams])
    expect(data).toBe(true)
  })
})
