import ParseMailTemplateProviderDTO from '@shared/container/providers/MailTemplateProvider/dtos/ParseMailTemplateProviderDTO';

export default interface MailTemplateProviderInterface {
  parseTemplate(data: ParseMailTemplateProviderDTO): Promise<string>;
}
