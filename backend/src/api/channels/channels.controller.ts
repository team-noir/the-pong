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
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { ChannelsService } from './channels.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  CreateChannelDto,
  ChannelDmDto,
  SettingChannelDto,
  ChannelPasswordDto,
  ChannelRoleDto,
  ChannelMessageDto,
} from './dtos/channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @ApiOperation({ summary: 'Create channel' })
  @UseGuards(AuthenticatedGuard)
  create(
    @Req() req,
    @Body() body: CreateChannelDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const result = this.channelsService.create(req.user.id, body);
      res.status(HttpStatus.OK);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get('dms/:userId')
  @ApiOperation({ summary: 'Get dm infomation' })
  @UseGuards(AuthenticatedGuard)
  initDirectMessage(
    @Req() req,
    @Param('userId') userId: number,
    @Body() body: ChannelDmDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const result = this.channelsService.initDirectMessage(req.user.id, userId, body);
      res.status(HttpStatus.OK);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get channel list' })
  @UseGuards(AuthenticatedGuard)
  list(
    @Req() req,
    @Query('enter') enter: string,
    @Query('kind') kind: string[],
    @Res({ passthrough: true }) res
  ) {
    const isEnter: boolean = enter != undefined;
    const isPublic: boolean = kind && kind.includes('public');
    const isPriv: boolean = kind && kind.includes('private');
    const isDm: boolean = kind && kind.includes('dm');
    res.status(HttpStatus.OK);
    return this.channelsService.list(
      req.user.id,
      isEnter,
      isPublic,
      isPriv,
      isDm
    );
  }

  @Get(':channelId')
  @ApiOperation({ summary: 'Get channel info' })
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
  @UseGuards(AuthenticatedGuard)
  setChannelInfo(
    @Req() req,
    @Body() data: SettingChannelDto,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.setChannelInfo(req.user.id, channelId, data);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post(':channelId')
  @ApiOperation({ summary: 'Join channel' })
  @UseGuards(AuthenticatedGuard)
  joinChannel(
    @Req() req,
    @Body() body: ChannelPasswordDto,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.join(req.user.id, channelId, body.password);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Put(':channelId/users/:userId')
  @ApiOperation({ summary: 'Invite user to channel' })
  @UseGuards(AuthenticatedGuard)
  inviteChannel(
    @Req() req,
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.invite(req.user.id, channelId, userId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete(':channelId')
  @ApiOperation({ summary: 'Leave channel' })
  @UseGuards(AuthenticatedGuard)
  leaveChannel(
    @Req() req,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.leave(req.user.id, channelId);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Patch(':channelId/users/:userId/role')
  @ApiOperation({ summary: 'Change channel user role' })
  @UseGuards(AuthenticatedGuard)
  changeRoleUser(
    @Req() req,
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Body() body: ChannelRoleDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.setUserInChannel(
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
  @UseGuards(AuthenticatedGuard)
  sendChannelMessage(
    @Req() req,
    @Param('channelId') channelId: number,
    @Body() body: ChannelMessageDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.messageToChannel(req.user.id, channelId, body.text);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get(':channelId/message')
  @ApiOperation({ summary: 'Get messages in channel' })
  @UseGuards(AuthenticatedGuard)
  getChannelMessages(
    @Req() req,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const messages = this.channelsService.getChannelMessages(
        req.user.id,
        channelId
      );
      res.status(HttpStatus.OK);
      return messages;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
