import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DmController } from './dm.controller';

@Module({
  imports: [AuthModule],
  exports: [ChannelsService],
  providers: [ChannelsService, PrismaService],
  controllers: [ChannelsController, DmController],
})
export class ChannelsModule {}
