import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { MyModule } from './api/my/my.module';
import { AuthModule } from './api/auth/auth.module';
import { AppController } from './app.controller';
import { ChannelsModule } from './api/channels/channels.module';
import { GamesModule } from './api/games/games.module';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MyModule,
    UsersModule,
    ChannelsModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppModule {}
