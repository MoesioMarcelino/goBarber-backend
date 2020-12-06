interface TemplateVariables {
  [key: string]: string | number;
}

export default interface ParseMailTemplateProviderDTO {
  template: string;
  variables: TemplateVariables;
}
