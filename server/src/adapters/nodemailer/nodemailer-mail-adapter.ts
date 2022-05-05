import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ea34659d61c77c",
      pass: "839503b86cd8c0"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Theus produções <oi@feedget.com>',
            to: 'Matheus Ricardo <matheus.ricardo.cs@gmail.com>',
            subject,
            html: body,
        })
    };
}