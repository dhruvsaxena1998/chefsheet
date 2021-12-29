import { DocumentBuilder } from '@nestjs/swagger';

export const documentConfig = (
  title = 'API Documentations',
  description = '',
  version = '1.0',
) => {
  return new DocumentBuilder()
    .setTitle(title)
    .addServer('http://localhost:3000', 'Localhost')
    .setDescription(description)
    .setVersion(version)
    .build();
};
