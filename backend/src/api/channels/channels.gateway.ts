import { Injectable, Logger } from '@nestjs/common';
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
import { Socket, Server } from 'socket.io';
import { ChannelsService, ChannelUser, Channel } from './channels.service';

@Injectable()
@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class ChannelsGatway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private channelsService: ChannelsService) {}

  @WebSocketServer() server: Server;
  private logger = new Logger('Gateway');

  afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
    this.channelsService.server = this.server;
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    var userId: number = Number(socket.handshake.query.userId);
    var username: string = String(socket.handshake.query.username);

    if (!userId || !username) {
      socket.disconnect(true);
      this.logger.log(`${socket.id} 소켓 연결 실패`);
      return;
    }
    if (this.channelsService.hasUser(userId)) {
      const logged = this.channelsService.getUser(userId);
      logged.socket.disconnect(true);
      logged.socket = socket;
      socket.data = { user: logged };
      return;
    }

    const user: ChannelUser = {
      id: userId,
      name: username,
      socket: socket,

      joined: new Set<number>(),
      invited: new Set<number>(),
    };
    socket.data = { user };
    this.channelsService.setUser(userId, user);
    this.logger.log(`${socket.id} 소켓 연결 : ${username}`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.handshake.query.username} 소켓 연결 해제 ❌`);
  }

  // Message

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('message') message: string
  ) {
    this.channelsService.messageToChannel(
      socket.data.user.id,
      channelId,
      message
    );
  }

  // Channel

  @SubscribeMessage('create')
  create(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    this.channelsService.create(socket.data.user.id, data);
  }

  @SubscribeMessage('join')
  join(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('password') password: string
  ) {
    this.channelsService.join(socket.data.user.id, channelId, password);
  }

  @SubscribeMessage('leave')
  leave(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number
  ) {
    this.channelsService.leave(socket.data.user.id, channelId);
  }

  @SubscribeMessage('list')
  list(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number
  ) {
    this.channelsService.list(channelId);
  }

  @SubscribeMessage('names')
  names(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number
  ) {
    this.channelsService.names(socket, channelId);
  }

  @SubscribeMessage('invite')
  invite(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('userId') userId: number
  ) {
    this.channelsService.invite(socket.data.user.id, channelId, userId);
  }

  @SubscribeMessage('kick')
  kick(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('userId') userId: number
  ) {
    this.channelsService.kick(socket, channelId, userId);
  }
}
