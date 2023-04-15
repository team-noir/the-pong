import { Module, forwardRef } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { AuthModule } from '../auth/auth.module';
import { AppGateway } from '../../app.gateway';
import { GameModel } from './models/game.model';
import { PrismaModule } from '../../prisma/prisma.module';
import { AppModule } from '../../app.module';

@Module({
	imports: [ChannelsModule, AuthModule, PrismaModule],
	providers: [GamesService, GameModel],
	controllers: [GamesController],
	exports: [GamesService, GameModel]
})
export class GamesModule {}
