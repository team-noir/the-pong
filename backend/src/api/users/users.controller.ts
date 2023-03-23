import {
  Controller,
  Req,
  Res,
  Get,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { UserDto } from './dtos/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(AuthenticatedGuard)
  async requestProfile(
    @Req() req: Request,
    @Param('userId') userId: number,
    @Res() res: Response
  ) {
    const user: UserDto = await this.usersService.getUser(req, Number(userId));
    const statusCode = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode).send(user);
  }

  @Get(':userId/profile-image')
  @UseGuards(AuthenticatedGuard)
  async downloadProfileImage(
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    const result = await this.usersService.downloadProfileImage(userId, res);
    const statusCode = result ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode).send(result);
  }
}
