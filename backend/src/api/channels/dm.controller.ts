import {
  Controller,
  Res,
  Req,
  Get,
  UseGuards,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { ChannelsService } from './channels.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('dms')
export class DmController {
  constructor(private channelsService: ChannelsService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get dm infomation' })
  @UseGuards(AuthenticatedGuard)
  initDirectMessage(
    @Req() req,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const result = this.channelsService.initDirectMessage(
        req.user.id,
        userId
      );
      res.status(HttpStatus.OK);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
