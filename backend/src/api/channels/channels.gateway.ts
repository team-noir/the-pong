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
import { ChannelsService } from './channels.service';
import { AuthService } from '../auth/auth.service';
import { parse } from 'cookie';
import { ChannelUser } from './models/user.model';

@Injectable()
@WebSocketGateway({
  cors: { credentials: true },
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

  async afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
    this.channelsService.server = this.server;
    await this.channelsService.initModels();
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
    if (this.channelsService.userModel.has(userId)) {
      const logged = this.channelsService.userModel.getUser(userId);
      if (logged.socket) {
        logged.socket.disconnect(true);
      }
      logged.socket = socket;
      socket.data = { user: logged };
      this.logger.log(
        `${socket.id} 소켓 재연결 성공 : { id: ${userId}, username: ${username} }`
      );
      const loggedUser = this.channelsService.userModel.getUser(userId);
      loggedUser.joined.forEach((channelId) => {
        logged.socket.join(String(channelId));
      });
      return;
    }

    const user = new ChannelUser(userId, username, socket);
    socket.data = { user };

    this.channelsService.userModel.setUser(userId, user);
    this.logger.log(
      `${socket.id} 소켓 연결 성공 : { id: ${userId}, username: ${username} }`
    );
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`${socket.handshake.query.username} 소켓 연결 해제 ❌`);
  }

  // Message

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('message') message: string
  ) {
    try {
      const channel = this.channelsService.channelModel.get(channelId);
      const user = this.channelsService.userModel.getUser(socket.data.user.id);

      await this.channelsService.messageToChannel(
        user,
        channel,
        message
      );
    } catch (error) {
      console.log(error);
    }
  }

  // Channel

  @SubscribeMessage('create')
  create(@ConnectedSocket() socket: Socket, @MessageBody() data) {
    this.channelsService.createChannel(socket.data.user.id, data);
  }

  @SubscribeMessage('join')
  async join(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('password') password: string
  ) {
    try {
      await this.channelsService.join(socket.data.user.id, channelId, password);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('leave')
  leave(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number
  ) {
    this.channelsService.leave(socket.data.user.id, channelId);
  }

  @SubscribeMessage('invite')
  invite(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('userId') userId: number[]
  ) {
    this.channelsService.invite(socket.data.user.id, channelId, userId);
  }
}
