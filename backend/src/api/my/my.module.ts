import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { MyController } from './my.controller';
import { MyService } from './my.service';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [MyService],
  controllers: [MyController],
})
export class MyModule {}
