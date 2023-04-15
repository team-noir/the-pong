import { Module } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { AuthModule } from '../auth/auth.module';
import { AppGatway } from 'src/app.gateway';
import { GameModel } from './models/game.model';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	imports: [ChannelsModule, AuthModule, PrismaModule],
	providers: [GamesService, AppGatway, GameModel],
	controllers: [GamesController],
	exports: [GamesService]
})
export class GamesModule {}
