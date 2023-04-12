import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DmController } from './dm.controller';

@Module({
  imports: [AuthModule],
  providers: [ChannelsService, PrismaService],
  controllers: [ChannelsController, DmController],
  exports: [ChannelsService]
})
export class ChannelsModule {}
