import { Module } from '@nestjs/common';
import { ChannelsModule } from '../channels/channels.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
	imports: [ChannelsModule],
	providers: [GamesService],
	controllers: [GamesController],
})
export class GamesModule {}
