import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MyModule } from './api/my/my.module';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { ChannelsModule } from './api/channels/channels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    MyModule,
    PrismaModule,
    AuthModule,
    ChannelsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
