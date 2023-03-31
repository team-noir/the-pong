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
import { ChannelsService, ChannelUser } from './channels.service';
import { AuthService } from '../auth/auth.service';
import { parse } from 'cookie';

@Injectable()
@WebSocketGateway({
  cors: {
    credentials: true,
  },
})
export class ChannelsGatway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private channelsService: ChannelsService,
    private authService: AuthService
  ) {}

  @WebSocketServer() server: Server;
  private logger = new Logger('Gateway');

  afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
    this.channelsService.server = this.server;
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    const cookie = parse(String(socket.handshake.headers.cookie));
    if (!cookie.Authorization) {
      this.logger.log(
        `${socket.id} 소켓 연결 실패 : cookie에서 jwt를 찾을 수 없습니다.`
      );
      return;
    }

    const payload = this.authService.getJwtPayload(cookie.Authorization);
    if (!payload) {
      this.logger.log(
        `${socket.id} 소켓 연결 실패 : payload를 가져을 수 없습니다.`
      );
      return;
    }

    const userId = Number(payload.id);
    const username = String(payload.nickname);

    if (!userId || !username) {
      socket.disconnect(true);
      this.logger.log(
        `${socket.id} 소켓 연결 실패 : payload에서 userId, username을 가져올 수 없습니다.`
      );
      return;
    }
    if (this.channelsService.hasUser(userId)) {
      const logged = this.channelsService.getUser(userId);
      logged.socket.disconnect(true);
      logged.socket = socket;
      socket.data = { user: logged };
      this.logger.log(
        `${socket.id} 소켓 재연결 성공 : { id: ${userId}, username: ${username} }`
      );
      return;
    }

    const user: ChannelUser = {
      id: userId,
      name: username,
      socket: socket,

      joined: new Set<number>(),
      invited: new Set<number>(),
      blockUser: new Set<number>(),
    };
    socket.data = { user };
    this.channelsService.setUser(userId, user);
    this.logger.log(
      `${socket.id} 소켓 연결 성공 : { id: ${userId}, username: ${username} }`
    );
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
