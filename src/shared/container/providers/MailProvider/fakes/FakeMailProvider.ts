import MailProviderInterface from '@shared/container/providers/MailProvider/models/MailProviderInterface';
import SendMailDTO from '@shared/container/providers/MailProvider/dtos/SendMailDTO';

export default class FakeMailProvider implements MailProviderInterface {
  private messages: SendMailDTO[] = [];

  public async sendMail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
