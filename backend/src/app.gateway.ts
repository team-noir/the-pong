import { Injectable, Logger, Inject, forwardRef, HttpException } from '@nestjs/common';
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
import { parse } from 'cookie';

import { ChannelsService } from './api/channels/channels.service';
import { AuthService } from './api/auth/auth.service';
import { GamesService } from './api/games/games.service';

import { ChannelUser } from './api/channels/models/user.model';
import { Player } from './api/games/dtos/player.dto';

type userId = number;

@Injectable()
@WebSocketGateway({
  cors: { credentials: true },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private userSockets: Map<userId, Socket>;

  constructor(
    private authService: AuthService,
    private channelsService: ChannelsService,
    @Inject(forwardRef(() => GamesService))
    public gamesService: GamesService
  ) {
    this.userSockets = new Map<userId, Socket>();
  }

  @WebSocketServer() server: Server;
  private logger = new Logger('Gateway');

  async afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
    this.channelsService.server = this.server;
    this.gamesService.init(this.server);
    await this.channelsService.initModels();
  }

  getUserInfoFromSocket(socket: Socket) {
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
    return { userId: userId, username: username };
  }

  getUserSocket(userId: number) {
    return this.userSockets.get(userId);
  }

  isUserOnline(userId: number) {
    return this.userSockets.has(userId);
  }

  setUserOnline(userId: number, socket: Socket) {
    this.userSockets.set(userId, socket);
  }

  setUserOffline(userId: number) {
    this.userSockets.delete(userId);
  }

  async handleConnection(@ConnectedSocket() socket: Socket) {
    const userInfo = this.getUserInfoFromSocket(socket);
    if (!userInfo || !userInfo.userId || !userInfo.username) { 
      this.logger.log(`${socket.id} 소켓 연결 실패 ❌`);
    }

    const { userId, username } = userInfo;
    socket.data = { userId, username }

    if (this.isUserOnline(userId)) {
      this.channelsService.userModel.resetUserSocket(userId, socket);
      this.logger.log(
        `${socket.id} 소켓 재연결 성공 : { id: ${userId}, username: ${username} }`
      );
    } else {
      this.channelsService.userModel.addUser(userId, username, socket);
      this.logger.log(
        `${socket.id} 소켓 연결 성공 : { id: ${userId}, username: ${username} }`
      );
    }

    this.setUserOnline(userId, socket);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const userInfo = this.getUserInfoFromSocket(socket);
    if (!userInfo || !userInfo.userId || !userInfo.username) { 
      return ;
    }

    const logged = this.channelsService.userModel.getUser(userInfo.userId);
    logged.socket = null;
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
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
      const user = this.channelsService.userModel.getUser(socket.data.userId);

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
    this.channelsService.createChannel(socket.data.userId, data);
  }

  @SubscribeMessage('join')
  async join(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('password') password: string
  ) {
    try {
      await this.channelsService.join(socket.data.userId, channelId, password);
    } catch (error) {
      console.log(error);
    }
  }

  @SubscribeMessage('leave')
  leave(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number
  ) {
    this.channelsService.leave(socket.data.userId, channelId);
  }

  @SubscribeMessage('invite')
  invite(
    @ConnectedSocket() socket: Socket,
    @MessageBody('channelId') channelId: number,
    @MessageBody('userId') userId: number[]
  ) {
    this.channelsService.invite(socket.data.userId, channelId, userId);
  }
  
  @SubscribeMessage('queue')
  async queue(
    @ConnectedSocket() socket: Socket,
    @MessageBody('isLadder') isLadder: boolean
  ) {
    try {
      const userId = socket.data.userId;
      await this.gamesService.addUserToQueue(userId, isLadder);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
  
  @SubscribeMessage('removeQueue')
  removeQueue(
    @ConnectedSocket() socket: Socket,
  ) {
    const userId = socket.data.userId;
    const user = this.channelsService.userModel.getUser(userId);
    this.gamesService.removeUserFromQueue(user.id);
  }
  
  @SubscribeMessage('pong')
  pong(
    @ConnectedSocket() socket: Socket
  ) {
    const userId = socket.data.userId;
    this.gamesService.gameModel.receivePong(userId);
  }

  @SubscribeMessage('gameStatus')
  gameStatus(
    @ConnectedSocket() socket: Socket
  ) {
    this.gamesService.gameModel.gameStatus(socket);
  }
  
  @SubscribeMessage('gameInvite')
  async gameInvite(
    @ConnectedSocket() socket: Socket,
    @MessageBody('invitedId') invitedId: number
  ) {
    try {
      await this.gamesService.inviteUserToGame(socket.data.userId, invitedId);
    } catch (error) {
      console.log(error);
    }
  }
  
  @SubscribeMessage('gameInviteAnswer')
  async gameInviteAnswer(
    @ConnectedSocket() socket: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('isAccepted') isAccepted: boolean,
  ) {
    try {
      await this.gamesService.answerInvitation(socket.data.userId, gameId, isAccepted);
    } catch (error) {
      console.log(error);
    }
  }
}
