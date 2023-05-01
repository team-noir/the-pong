import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  Query,
  Res,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBody,
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import {
  AddUserToQueueDto,
  InviteUserToGameDto,
  AnswerInvitationDto,
  GameSettingInfoDto,
  SetGameSettingDto,
} from './dtos/games.dto';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { GamesService } from './games.service';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get game list.' })
  @UseGuards(AuthenticatedGuard)
  getGameList(@Res({ passthrough: true }) res) {
    try {
      const gameList = this.gamesService.getGameList();
      res.status(HttpStatus.OK);
      return gameList;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post('queue')
  @ApiOperation({ summary: 'Add user to queue.' })
  @ApiCreatedResponse({ description: 'The user has been added to the queue.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @ApiConflictResponse({ description: 'The user is already playing the game.' })
  @UseGuards(AuthenticatedGuard)
  async addUserToQueue(
    @Req() req,
    @Body() body: AddUserToQueueDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const isLadder = body.isLadder;
      await this.gamesService.addUserToQueue(req.user.id, isLadder);
      res.status(HttpStatus.CREATED);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete('queue')
  @ApiOperation({ summary: 'Cancel game queue.' })
  @ApiNoContentResponse({ description: 'Cancel game queue.' })
  @ApiBadRequestResponse({
    description: 'This user is not waiting for a game.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @UseGuards(AuthenticatedGuard)
  removeUserFromQueue(@Req() req, @Res({ passthrough: true }) res) {
    try {
      this.gamesService.removeUserFromQueue(req.user.id);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post('invite')
  @ApiOperation({ summary: 'Invite users to your game.' })
  @ApiCreatedResponse({ description: 'Invite users to your game.' })
  @ApiBadRequestResponse({ description: 'This user cannot be invited.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @ApiConflictResponse({ description: 'This user cannot be invited.' })
  @UseGuards(AuthenticatedGuard)
  async inviteUserToGame(
    @Req() req,
    @Body() body: InviteUserToGameDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      const invitedUserId = body.userId;
      await this.gamesService.inviteUserToGame(userId, invitedUserId);
      res.status(HttpStatus.CREATED);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete('invite')
  @ApiOperation({ summary: 'Cancel the invitation.' })
  @ApiNoContentResponse({ description: 'The invitation has been canceled.' })
  @ApiBadRequestResponse({ description: 'You have not invited other users.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @UseGuards(AuthenticatedGuard)
  cancelInvitation(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const userId = req.user.id;
      this.gamesService.cancelInvitation(userId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':gameId/invite')
  @ApiOperation({ summary: 'Respond to the invitation.' })
  @ApiNoContentResponse({
    description: 'You have responded to the invitation.',
  })
  @ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @ApiConflictResponse({
    description: 'You are participating in another game.',
  })
  @UseGuards(AuthenticatedGuard)
  async answerInvitation(
    @Req() req,
    @Param('gameId') gameId: number,
    @Body() body: AnswerInvitationDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      await this.gamesService.answerInvitation(userId, gameId, body.isAccepted);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get(':gameId/setting')
  @ApiOperation({ summary: 'Get game settings.' })
  @ApiOkResponse({
    description: 'Get game settings.',
    type: GameSettingInfoDto,
  })
  @ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
  @UseGuards(AuthenticatedGuard)
  gameSettingInfo(
    @Param('gameId') gameId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const info = this.gamesService.gameSettingInfo(gameId);
      res.status(HttpStatus.OK);
      return info;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':gameId/setting')
  @ApiOperation({ summary: 'Change game settings.' })
  @ApiOkResponse({
    description: 'Change game settings.',
    type: GameSettingInfoDto,
  })
  @ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
  @UseGuards(AuthenticatedGuard)
  async setGameSettings(
    @Req() req,
    @Param('gameId') gameId: number,
    @Body() body: SetGameSettingDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      await this.gamesService.setGameSettings(
        userId,
        gameId,
        body.mode,
        body.theme
      );
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':gameId/play')
  @ApiOperation({ summary: 'Start the game.' })
  @ApiOkResponse({ description: 'Start the game.' })
  @ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
  @UseGuards(AuthenticatedGuard)
  async startGame(
    @Req() req,
    @Param('gameId') gameId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      await this.gamesService.startGame(userId, gameId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':gameId/users')
  @ApiOperation({ summary: 'Join the live game.' })
  @ApiNoContentResponse({ description: 'Join the live game.' })
  @ApiBadRequestResponse({ description: 'This game does not exist.' })
  @ApiBadRequestResponse({ description: 'This game is not playing.' })
  @ApiConflictResponse({ description: 'You are already in this game.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @UseGuards(AuthenticatedGuard)
  async watchGame(
    @Req() req,
    @Param('gameId') gameId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      await this.gamesService.watchGame(userId, gameId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete(':gameId/users')
  @ApiOperation({ summary: 'Leave the game.' })
  @ApiNoContentResponse({ description: 'Leave the game.' })
  @ApiBadRequestResponse({ description: 'This user is not in the game.' })
  @ApiBadRequestResponse({ description: 'This game is not exist.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
  @UseGuards(AuthenticatedGuard)
  async leaveGame(
    @Req() req,
    @Param('gameId') gameId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      await this.gamesService.leaveGame(userId, gameId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get(':gameId')
  @ApiOperation({ summary: 'Get game information.' })
  @UseGuards(AuthenticatedGuard)
  async getGameInfo(
    @Req() req,
    @Param('gameId') gameId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const userId = req.user.id;
      const gameInfo = await this.gamesService.getGameInfo(userId, gameId);
      res.status(HttpStatus.OK);
      return gameInfo;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get('users/:userId')
  @ApiOperation({ summary: 'Get game history.' })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
  })
  @UseGuards(AuthenticatedGuard)
  async getGameHistory(
    @Req() req,
    @Param('userId') userId: number,
    @Query('page') page: number,
    @Query('per_page') perPage: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const history = await this.gamesService.gameModel.getGameHistory(
        userId,
        page,
        perPage
      );
      res.status(HttpStatus.OK);
      return history;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
