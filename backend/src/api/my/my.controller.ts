import {
  Controller,
  Get,
  Put,
  Patch,
  Req,
  Param,
  Res,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { MyService } from './my.service';
import { MyDto } from './dtos/my.dto';
import { SettingDto } from './dtos/setting.dto';

@ApiTags('my')
@Controller('my')
export class MyController {
  constructor(private myService: MyService) {}

  @Get('whoami')
  @ApiBody({
    description: 'userid',
    examples: {
      ftOauth: {
        value: {
          id: 1,
          nickname: null,
          rank: 0,
          isTwoFactor: false,
          ftUsername: 'cpak',
          createdAt: '2023-03-15T09:21:08.389Z',
          updatedAt: null,
          deletedAt: null,
        },
      },
    },
  })
  @UseGuards(AuthenticatedGuard)
  async whoami(@Req() req, @Res() res) {
    const user: MyDto = await this.myService.whoami(req);
    const statusCode = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode).send(user);
  }

  @Patch('settings')
  @UseGuards(AuthenticatedGuard)
  async setMyProfile(@Req() req, @Body() body: SettingDto, @Res() res) {
    const user: MyDto = await this.myService.setMyProfile(req, body);
    const statusCode = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode).send(user);
  }

  @Get('follwing')
  @UseGuards(AuthenticatedGuard)
  async getFollowing(@Req() req) {
    return this.myService.getFollowing(req);
  }

  @Put('follwing/:userId')
  @UseGuards(AuthenticatedGuard)
  async putFollowing(@Req() req, @Param('userId') userId: number, @Res() res) {
    try {
      await this.myService.putFollowing(req);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
