import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie_parser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BaseAPIDocumentation } from './api/base.document';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const documentOptitons = new BaseAPIDocumentation().initializeOptions();
  const document = SwaggerModule.createDocument(app, documentOptitons);
  SwaggerModule.setup('api/v1/docs', app, document);

  app.use(cookie_parser());
  await app.listen(8000);
}
bootstrap();
