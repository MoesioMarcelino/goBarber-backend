interface TemplateVariables {
  [key: string]: string | number;
}

export default interface ParseMailTemplateProviderDTO {
  file: string;
  variables: TemplateVariables;
}
