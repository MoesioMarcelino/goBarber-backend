import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import SendMailDTO from '@shared/container/providers/MailProvider/dtos/SendMailDTO';
import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import MailTemplateProviderInterface from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';

@injectable()
class EtherealMailProvider implements MailProviderInterface {
  private client!: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProviderInterface,
  ) {
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

  public async sendMail({
    to,
    from,
    subject,
    template,
  }: SendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      subject,
      html: await this.mailTemplateProvider.parseTemplate(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Message URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
