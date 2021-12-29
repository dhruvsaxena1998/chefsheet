import { DocumentBuilder } from '@nestjs/swagger';

export const documentConfig = (
  title = 'API Documentations',
  description = '',
  version = '1.0',
  path = '/api-docs',
) => {
  return new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .setBasePath(path)
    .build();
};
