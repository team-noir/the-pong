import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersController } from './users.controller';

import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../auth/google.strategy';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, PassportModule, AuthModule],
  providers: [UsersService, GoogleStrategy],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
