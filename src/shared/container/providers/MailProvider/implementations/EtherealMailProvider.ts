import nodemailer, { Transporter } from 'nodemailer';

import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';

class EtherealMailProvider implements MailProviderInterface {
  private client!: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      to,
      from: 'Equipe GoBarber <equipe@gobarber.com>',
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Message URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
