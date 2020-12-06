import MailTemplateProviderInterface from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';

import ParseMailTemplateProviderDTO from '@shared/container/providers/MailTemplateProvider/dtos/ParseMailTemplateProviderDTO';

export default class FakeMailTemplateProvider
  implements MailTemplateProviderInterface {
  public async parseTemplate({
    template,
  }: ParseMailTemplateProviderDTO): Promise<string> {
    return template;
  }
}
