import {
  Controller,
  Res,
  Req,
  Body,
  Query,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  UseGuards,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { ChannelsService } from './channels.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import {
  CreateChannelDto,
  ChannelListDto,
  SettingChannelDto,
  ChannelPasswordDto,
  ChannelRoleDto,
  ChannelMessageDto,
  ChannelUserStatusDto,
  ChannelInviteDto,
  ChannelIdDto,
  ChannelInfoDto,
  ChannelDetailDto,
  ChannelMessageTextDto,
} from './dtos/channel.dto';
import { PageRequestDto } from '../dtos/pageRequest.dto';

@ApiTags('channels')
@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create channel' })
  @ApiCreatedResponse({
    description: 'The channel has been successfully created.',
    type: ChannelIdDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @ApiBadRequestResponse({ description: 'This user does not exist.' })
  @UseGuards(AuthenticatedGuard)
  async createChannel(
    @Req() req,
    @Body() body: CreateChannelDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const result = await this.channelsService.createChannel(
        req.user.id,
        body
      );
      res.status(HttpStatus.CREATED);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get channel list' })
  @ApiOkResponse({ type: [ChannelInfoDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async list(
    @Req() req,
    @Query() query: ChannelListDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      res.status(HttpStatus.OK);
      return await this.channelsService.list(req.user.id, query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':channelId')
  @ApiOperation({ summary: 'Get channel info' })
  @ApiOkResponse({
    type: [ChannelDetailDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @ApiBadRequestResponse({ description: 'This channel does not exist.' })
  @ApiForbiddenResponse({
    description: 'You are not authorized to this channel.',
  })
  @UseGuards(AuthenticatedGuard)
  getChannelInfo(
    @Req() req,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const info = this.channelsService.getChannelInfo(req.user.id, channelId);
      res.status(HttpStatus.OK);
      return info;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':channelId')
  @ApiOperation({ summary: 'Set channel info' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @ApiBadRequestResponse({ description: 'This channel does not exist.' })
  @ApiBadRequestResponse({ description: 'This user does not exist.' })
  @ApiBadRequestResponse({ description: 'DM channel cannot change settings.' })
  @ApiBadRequestResponse({
    description: 'Private channel cannot set a password.',
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to change settings.',
  })
  @UseGuards(AuthenticatedGuard)
  async setChannelInfo(
    @Req() req,
    @Body() data: SettingChannelDto,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.setChannelInfo(req.user.id, channelId, data);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Put(':channelId')
  @ApiOperation({ summary: 'Join channel' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async joinChannel(
    @Req() req,
    @Body() body: ChannelPasswordDto,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.join(req.user.id, channelId, body.password);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Put(':channelId/users')
  @ApiOperation({ summary: 'Invite user to channel' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async inviteChannel(
    @Req() req,
    @Param('channelId') channelId: number,
    @Body() body: ChannelInviteDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.invite(req.user.id, channelId, body.userIds);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete(':channelId/users')
  @ApiOperation({ summary: 'Leave channel' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async leaveChannel(
    @Req() req,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.leave(req.user.id, channelId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':channelId/users/:userId/role')
  @ApiOperation({ summary: 'Change channel user role' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async changeRoleUser(
    @Req() req,
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Body() body: ChannelRoleDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.setUserInChannel(
        req.user.id,
        channelId,
        userId,
        body.role
      );
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post(':channelId/message')
  @ApiOperation({ summary: 'Send message to channel' })
  @ApiCreatedResponse({
    description: 'The message has been successfully sent.',
    type: ChannelMessageDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async sendChannelMessage(
    @Req() req,
    @Param('channelId') channelId: number,
    @Body() body: ChannelMessageTextDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const channel = this.channelsService.channelModel.get(channelId);
      const user = this.channelsService.userModel.getUser(req.user.id);
      const message = await this.channelsService.messageToChannel(
        user,
        channel,
        body.text
      );
      res.status(HttpStatus.CREATED).send(message);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get(':channelId/message')
  @ApiOperation({ summary: 'Get messages in channel' })
  @ApiOkResponse({
    type: [ChannelMessageDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async getChannelMessages(
    @Req() req,
    @Param('channelId') channelId: number,
    @Query() query: PageRequestDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const channel = this.channelsService.channelModel.get(channelId);
      const user = this.channelsService.userModel.getUser(req.user.id);
      const messages = await this.channelsService.getChannelMessages(
        user,
        channel,
        query
      );
      res.status(HttpStatus.OK);
      return messages;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':channelId/users/:userId/status')
  @ApiOperation({ summary: 'Set user status in channel' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async setUserStatus(
    @Req() req,
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Body() body: ChannelUserStatusDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.channelsService.setUserStatus(
        req.user.id,
        channelId,
        userId,
        body.status
      );
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
