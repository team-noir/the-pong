import { Module } from '@nestjs/common';
import { ChatEventGatway } from './chat.events.gateway';

@Module({
	providers: [ChatEventGatway]
})
export class ChatEventsModule {}
