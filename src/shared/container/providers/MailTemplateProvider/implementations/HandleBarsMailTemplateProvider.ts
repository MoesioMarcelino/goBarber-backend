import handlebars from 'handlebars';

import MailTemplateProviderInterface from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';

import ParseMailTemplateProviderDTO from '@shared/container/providers/MailTemplateProvider/dtos/ParseMailTemplateProviderDTO';

export default class HandleBarsMailTemplateProvider
  implements MailTemplateProviderInterface {
  public async parseTemplate({
    template,
    variables,
  }: ParseMailTemplateProviderDTO): Promise<string> {
    const parsedTemplate = handlebars.compile(template);

    return parsedTemplate(variables);
  }
}
