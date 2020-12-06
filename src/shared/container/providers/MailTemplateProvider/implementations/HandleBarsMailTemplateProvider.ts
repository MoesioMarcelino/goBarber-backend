import handlebars from 'handlebars';
import fs from 'fs';

import MailTemplateProviderInterface from '@shared/container/providers/MailTemplateProvider/models/MailTemplateProviderInterface';

import ParseMailTemplateProviderDTO from '@shared/container/providers/MailTemplateProvider/dtos/ParseMailTemplateProviderDTO';

export default class HandleBarsMailTemplateProvider
  implements MailTemplateProviderInterface {
  public async parseTemplate({
    file,
    variables,
  }: ParseMailTemplateProviderDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parsedTemplate = handlebars.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}
