import {
	Controller,
	Res,
	Req,
	Body,
	Get,
	UseGuards,
	Param,
	HttpStatus,
	HttpException,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { ChannelsService } from './channels.service';
import { ApiOperation } from '@nestjs/swagger';
import {
	ChannelDmDto,
} from './dtos/channel.dto';

@Controller('dms')
export class DmController {
	constructor(private channelsService: ChannelsService) {}

	@Get(':userId')
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

}
