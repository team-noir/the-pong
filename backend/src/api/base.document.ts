import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export class BaseAPIDocumentation {
	public builder = new DocumentBuilder();

	public initializeOptions() {
		return this.builder
			.setTitle('The pong')
			.setDescription('The cats API description')
			.setVersion('1.0')
			.addTag('pong')
			.build();
	}
}
