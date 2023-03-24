import { Logger } from '@nestjs/common';
import { 
	WebSocketGateway, 
	WebSocketServer, 
	ConnectedSocket, 
	OnGatewayInit, 
	OnGatewayConnection, 
	OnGatewayDisconnect, 
	SubscribeMessage, 
	MessageBody,
} from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';

@WebSocketGateway({
	namespace: 'chat',
	cors: {
		origin: ['http://localhost:3000'],
	},
})
export class ChatEventGatway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	private logger = new Logger('Gateway');

	@WebSocketServer() server: Namespace;

	// 초기화 이후에 실행
	afterInit() {
		this.server.adapter.on('ping', (msg) => {
			this.logger.log(msg);
			this.server.adapter.emit('pong', {
				msg: new Date().getTime()
			})
		});

		this.server.adapter.on('create-room', (room) => {
			this.logger.log(`"Room:${room}"이 생성되었습니다.`);
		});
	
		this.server.adapter.on('join-room', (room, id) => {
			this.logger.log(`"Socket:${id}"이 "Room:${room}"에 참여하였습니다.`);
		});
	
		this.server.adapter.on('leave-room', (room, id) => {
			this.logger.log(`"Socket:${id}"이 "Room:${room}"에서 나갔습니다.`);
		});
	
		this.server.adapter.on('delete-room', (roomName) => {
			this.logger.log(`"Room:${roomName}"이 삭제되었습니다.`);
		});
	
		this.logger.log('웹소켓 서버 초기화 ✅');
	}

	// 소켓이 연결되면 실행
	handleConnection(@ConnectedSocket() socket: Socket) {
		this.logger.log(`${socket.id} 소켓 연결`);
	}
  
	// 소켓 연결이 끊기면 실행
	handleDisconnect(@ConnectedSocket() socket: Socket) {
		this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
	}

	@SubscribeMessage('message')
	handleMessage(
	  @ConnectedSocket() socket: Socket,
	  @MessageBody() message: string,
	) {
	  socket.emit('message', { username: socket.id, message });
	  this.logger.log(message);
	  return { username: socket.id, message };
	}

	@SubscribeMessage('create-room')
	createRoom(
	  @ConnectedSocket() socket: Socket,
	  @MessageBody() message: string,
	) {
	  socket.emit('message', { username: socket.id, message });
	  this.logger.log(message);
	  return { username: socket.id, message };
	}
	
	@SubscribeMessage('ping')
	ping(
	  @ConnectedSocket() socket: Socket,
	  @MessageBody() message: string,
	) {
	  socket.emit('pong', {
		msg: new Date().getTime()
	});
	  this.logger.log(message);
	  return { username: socket.id, message };
	}

}
