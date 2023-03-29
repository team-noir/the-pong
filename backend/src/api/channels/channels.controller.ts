import {
  Controller,
  Res,
  Req,
  Body,
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

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Req() req, @Body() body, @Res({ passthrough: true }) res) {
    try {
      const result = this.channelsService.create(req.user.id, body);
      res.status(HttpStatus.OK);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  list(@Res({ passthrough: true }) res) {
    res.status(HttpStatus.OK);
    return this.channelsService.list(undefined);
  }

  @Get(':channelId')
  @UseGuards(AuthenticatedGuard)
  getChannelInfo(
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const info = this.channelsService.getChannelInfo(channelId);
      res.status(HttpStatus.OK);
      return info;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':channelId')
  @UseGuards(AuthenticatedGuard)
  setChannelInfo(
    @Req() req,
    @Body() data,
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
  @UseGuards(AuthenticatedGuard)
  joinChannel(
    @Req() req,
    @Body('password') password,
    @Param('channelId') channelId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.join(req.user.id, channelId, password);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Put(':channelId/users/:userId')
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
  @UseGuards(AuthenticatedGuard)
  changeRoleUser(
    @Req() req,
    @Param('channelId') channelId: number,
    @Param('userId') userId: number,
    @Body('role') role: string,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.setUserInChannel(
        req.user.id,
        channelId,
        userId,
        role
      );
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post(':channelId/message')
  @UseGuards(AuthenticatedGuard)
  sendChannelMessage(
    @Req() req,
    @Param('channelId') channelId: number,
    @Body('message') message: string,
    @Res({ passthrough: true }) res
  ) {
    try {
      this.channelsService.messageToChannel(req.user.id, channelId, message);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get(':channelId/message')
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
