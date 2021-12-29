import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { documentConfig } from './swagger.config';

const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.enableCors();

  // use validation pipe for all requests
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, documentConfig());
  SwaggerModule.setup('api/docs', app, document);

  console.log(`🚀 Starting server at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
