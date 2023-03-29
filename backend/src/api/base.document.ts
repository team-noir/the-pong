import { DocumentBuilder } from '@nestjs/swagger';

export class BaseAPIDocumentation {
  public builder = new DocumentBuilder();

  public initializeOptions() {
    return this.builder
      .setTitle('The pong')
      .setDescription('The pong API')
      .setVersion('1.0')
      .addTag('pong')
      .build();
  }
}
