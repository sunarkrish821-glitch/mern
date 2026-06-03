import nodemailer, { TransportOptions } from "nodemailer";
import { SMTPConfig } from "../config/app-env";

class EmailService{
  #transport;

  constructor() {
    try {
      const config = {
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        service: "gmail",
        auth: {
          user: SMTPConfig.user,
          pass: SMTPConfig.password,
        },
      } as TransportOptions;

      this.#transport = nodemailer.createTransport(config)
      console.log("SMTP Connected")
    } catch(exception) {
      console.error("Error smtp connection: ", exception)
    }
  }

  async sendEmail(messageConfig:{to: string, sub: string, body: string}) {
    try {
      return await this.#transport?.sendMail({
        to: messageConfig.to, 
        from: SMTPConfig.from,
        subject: messageConfig.sub,
        html: messageConfig.body
      })
    } catch(exception) {
      console.log(exception)
      throw {code: 500, message: "Error sending email..."}
    }
  }
}

export default EmailService;