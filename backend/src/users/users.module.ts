import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';
import { MyController } from './my.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { FTStrategy } from './auth/ft.strategy';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
        useFactory: () => ({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: 3600 },
        })
		  }),
  ],
  providers: [
    UsersService, 
    AuthService, 
    FTStrategy, 
  ],
  controllers: [
    UsersController,
    MyController
  ],
  exports: [UsersService],
})
export class UsersModule {}
