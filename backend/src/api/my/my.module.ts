import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { MyController } from './my.controller';
import { MyService } from './my.service';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [AuthModule, PrismaModule, ChannelsModule],
  providers: [MyService],
  controllers: [MyController],
})
export class MyModule {}
