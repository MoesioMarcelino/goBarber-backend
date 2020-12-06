import ParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/ParseMailTemplateProviderDTO';

interface MailContact {
  name: string;
  email: string;
}

export default interface SendMailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  template: ParseMailTemplateDTO;
}
