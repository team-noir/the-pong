import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersController } from './users.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { FTStrategy } from './auth/ft.strategy';
import { JwtStrategy } from './auth/jwt.strategy';

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
    JwtStrategy, 
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
