import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  console.log(`🚀 Starting server at http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
