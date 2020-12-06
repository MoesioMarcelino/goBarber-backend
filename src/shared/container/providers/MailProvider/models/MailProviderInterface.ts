import SendMailDTO from '@shared/container/providers/MailProvider/dtos/SendMailDTO';

export default interface MailProviderInterface {
  sendMail(data: SendMailDTO): Promise<void>;
}
