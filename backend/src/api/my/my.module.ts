import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { MyController } from './my.controller';
import { MyService } from './my.service';

@Module({
	imports: [
		AuthModule
	],
	providers: [
		MyService,
	],
	controllers: [
		MyController
	],
})
export class MyModule {}
