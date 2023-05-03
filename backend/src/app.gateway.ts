import {
  Injectable,
  Logger,
  Inject,
  forwardRef,
  HttpException,
} from '@nestjs/common';
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
import { PrismaService } from '@/prisma/prisma.service';
import { GAME_STATUS } from './const';

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
    public gamesService: GamesService,
    private prismaService: PrismaService
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

  isUserPlaying(userId: number) {
    return this.gamesService.gameModel.isPlayerInGame(userId);
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
      socket.disconnect(true);
      return;
    }

    const { userId, username } = userInfo;
    socket.data = { userId, username };
    let log;

    if (this.channelsService.userModel.has(userId)) {
      this.channelsService.userModel.reconnectUserSocket(userId, socket);
      log = `${socket.id} 소켓 userModel에 재연결 성공 : { id: ${userId}, username: ${username} }`;
    }
    if (this.gamesService.gameModel.isPlayerInGame(userId)) {
      this.gamesService.gameModel.reconnectPlayerSocket(userId, socket);
      log = `${socket.id} 소켓 gameModel에 재연결 성공 : { id: ${userId}, username: ${username} }`;
    }
    if (!log) {
      log = `${socket.id} 소켓 연결 성공 : { id: ${userId}, username: ${username} }`;
      this.channelsService.userModel.addUser(userId, username, socket);
    }

    this.logger.log(log);
    this.setUserOnline(userId, socket);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    const userInfo = this.getUserInfoFromSocket(socket);
    if (!userInfo || !userInfo.userId || !userInfo.username) {
      return;
    }

    const logged = this.channelsService.userModel.getUser(userInfo.userId);
    this.userSockets.delete(userInfo.userId);

    logged.socket = null;
    this.logger.log(`${socket.id} 소켓 연결 해제 ❌`);
  }

  // WebRTC Connection

  @SubscribeMessage('rtcCandidate')
  async rtcCandidate(
    @ConnectedSocket() socket: Socket,
    @MessageBody('candidate') candidate,
    @MessageBody('candidateSendUserId') candidateSendUserId: number,
    @MessageBody('candidateReceiveUserId') candidateReceiveUserId: number
  ) {
    const receiveSocket = this.getUserSocket(candidateReceiveUserId);

    await socket.to(receiveSocket.id).emit('rtcGetCandidate', {
      candidate: candidate,
      candidateSendUserId: candidateSendUserId,
    });
  }

  @SubscribeMessage('rtcOffer')
  async rtcOffer(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sdp') sdp,
    @MessageBody('offerSendUserId') offerSendUserId: number,
    @MessageBody('offerReceiveUserId') offerReceiveUserId: number
  ) {
    const receiveSocket = this.getUserSocket(offerReceiveUserId);

    await socket.to(receiveSocket.id).emit('rtcGetOffer', {
      sdp: sdp,
      offerSendUserId: offerSendUserId,
    });
  }

  @SubscribeMessage('rtcAnswer')
  async rtcAnswer(
    @ConnectedSocket() socket: Socket,
    @MessageBody('sdp') sdp,
    @MessageBody('answerSendUserId') answerSendUserId: number,
    @MessageBody('answerReceiveUserId') answerReceiveUserId: number
  ) {
    const receiveSocket = this.getUserSocket(answerReceiveUserId);

    await socket.to(receiveSocket.id).emit('rtcGetAnswer', {
      sdp: sdp,
      answerSendUserId: answerSendUserId,
    });
  }

  @SubscribeMessage('rtcConnected')
  async rtcConnected(
    @ConnectedSocket() socket: Socket,
    @MessageBody('userId') userId: number
  ) {
    const player = this.gamesService.gameModel.getPlayer(socket.data.userId);
    const game = player.game;

    if (game.status != GAME_STATUS.PLAYING) {
      game.status = GAME_STATUS.PLAYING;
      await game.noticeToPlayers('gameStart', {});
    }
    if (game.status == GAME_STATUS.PLAYING) {
      game.viewerConnections.delete(userId);
    }
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

      await this.channelsService.messageToChannel(user, channel, message);
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
      socket.emit('queue', { text: 'created' });
    } catch (error) {
      socket.emit('queue', error);
    }
  }

  @SubscribeMessage('removeQueue')
  removeQueue(@ConnectedSocket() socket: Socket) {
    try {
      const userId = socket.data.userId;
      this.gamesService.removeUserFromQueue(userId);
      socket.emit('removeQueue', { text: 'removed' });
    } catch (error) {
      socket.emit('removeQueue', error);
    }
  }

  @SubscribeMessage('pong')
  async pong(@ConnectedSocket() socket: Socket) {
    const userId = socket.data.userId;
    await this.gamesService.gameModel.receivePong(userId);
  }

  @SubscribeMessage('gameInvite')
  async gameInvite(
    @ConnectedSocket() socket: Socket,
    @MessageBody('userId') userId: number
  ) {
    try {
      await this.gamesService.inviteUserToGame(socket.data.userId, userId);
    } catch (error) {
      socket.emit('gameInvite', error);
    }
  }

  @SubscribeMessage('gameInviteAnswer')
  async gameInviteAnswer(
    @ConnectedSocket() socket: Socket,
    @MessageBody('gameId') gameId: number,
    @MessageBody('isAccepted') isAccepted: boolean
  ) {
    try {
      await this.gamesService.answerInvitation(
        socket.data.userId,
        gameId,
        isAccepted
      );
    } catch (error) {
      socket.emit('gameInvite', error);
    }
  }

  @SubscribeMessage('cancelInvite')
  async cancelInvite(@ConnectedSocket() socket: Socket) {
    try {
      await this.gamesService.cancelInvitation(socket.data.userId);
    } catch (error) {
      socket.emit('gameInvite', error);
    }
  }

  @SubscribeMessage('roundOver')
  async roundOver(
    @ConnectedSocket() socket: Socket,
    @MessageBody('winnerId') winnerId: number
  ) {
    try {
      const player = await this.gamesService.gameModel.getPlayer(
        socket.data.userId
      );
      const game = player.game;
      if (game) {
        await this.gamesService.gameModel.roundOver(game.gameId, winnerId);
      }
    } catch (error) {
      await socket.emit('gameError', error);
    }
  }

  // For test

  @SubscribeMessage('disconnectPlayer')
  async disconnectPlayer(@ConnectedSocket() socket: Socket) {
    this.gamesService.gameModel.disconnectPlayer(socket.data.userId);
    socket.emit('disconnectPlayer');
  }

  @SubscribeMessage('gameStatus')
  async gameStatus(@ConnectedSocket() socket: Socket) {
    await this.gamesService.gameModel.gameStatus(socket);
  }

  @SubscribeMessage('addBlocked')
  async addBlocked(
    @ConnectedSocket() socket: Socket,
    @MessageBody('userId') userId: number
  ) {
    const blocker = socket.data.userId;
    const blocked = userId;

    await this.prismaService.blockUser.upsert({
      where: {
        id: {
          blockerId: blocker,
          blockedId: blocked,
        },
      },
      create: {
        blockerId: blocker,
        blockedId: blocked,
      },
      update: {
        blockerId: blocker,
        blockedId: blocked,
      },
    });
  }

  @SubscribeMessage('removeBlocked')
  async removeBlocked(
    @ConnectedSocket() socket: Socket,
    @MessageBody('userId') userId: number
  ) {
    const blocker = socket.data.userId;
    const blocked = userId;

    await this.prismaService.blockUser.delete({
      where: {
        id: {
          blockerId: blocker,
          blockedId: blocked,
        },
      },
    });
  }
}
