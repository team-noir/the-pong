import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
// import { RedisModule } from '@nestjs-modules/ioredis';

import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MyModule } from './api/my/my.module';
import { AuthModule } from './api/auth/auth.module';
import { ChatEventsModule } from './api/chat/chat.events.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register(),
    // RedisModule.forRoot({
    //   config: {
    //     url: process.env.REDIS_URL,
    //     password: process.env.REDIS_PASSWORD,
    //   },
    // }),
    UsersModule,
    MyModule,
    PrismaModule,
    AuthModule,
    ChatEventsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
