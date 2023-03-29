import { Module } from '@nestjs/common';
import { ChannelsGatway } from './channels.gateway';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [
    AuthService,
    ChannelsGatway,
    ChannelsService,
    JwtService,
    PrismaService,
  ],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
