import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { FTStrategy } from './ft.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common';

@Module({
	imports: [
		forwardRef(() => UsersModule), 
		PassportModule,
		JwtModule.registerAsync({
			useFactory: () => ({
				secret: process.env.JWT_SECRET,
				signOptions: { expiresIn: 3600 },
			})
		  }),
	],
	providers: [AuthService, FTStrategy, JwtStrategy],
	exports: [AuthService, JwtModule]
})
export class AuthModule {}
