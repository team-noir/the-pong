import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersController } from './users.controller';

import { PassportModule } from '@nestjs/passport';
import { FTStrategy } from '../auth/ft.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule, 
  ],
  providers: [
    UsersService, 
    FTStrategy, 
  ],
  controllers: [
    UsersController,
  ],
  exports: [UsersService],
})
export class UsersModule {}
