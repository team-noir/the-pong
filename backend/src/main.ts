import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.use(cookie_parser());
  await app.listen(8000);
}
bootstrap();
