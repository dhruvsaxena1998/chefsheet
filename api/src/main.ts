import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';

import { SwaggerModule } from '@nestjs/swagger';
import { documentConfig } from './swagger.config';
import * as morgan from 'morgan';

const port = 5000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.enableCors();

  app.use(morgan('tiny'));

  // use validation pipe for all requests
  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, documentConfig());
  SwaggerModule.setup('api/docs', app, document);

  console.log(`🚀 Starting server at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();

process.on('uncaughtException', (err) => {
  console.log('uncaughtException', err);
});
