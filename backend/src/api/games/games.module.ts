import { Module } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { AuthModule } from '../auth/auth.module';


@Module({
	imports: [ChannelsModule, AuthModule],
	providers: [GamesService],
	controllers: [GamesController],
	exports: [GamesService]
})
export class GamesModule {}
