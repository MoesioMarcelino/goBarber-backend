import MailTemplateProviderInterface from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';

export default class FakeMailTemplateProvider
  implements MailTemplateProviderInterface {
  public async parseTemplate(): Promise<string> {
    return 'Mail content';
  }
}
