import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MyService } from '../my/my.service';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: 3600 },
      }),
    }),
  ],
  providers: [AuthService, MyService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
