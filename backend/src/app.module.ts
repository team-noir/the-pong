import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './api/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MyModule } from './api/my/my.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule, 
    MyModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
