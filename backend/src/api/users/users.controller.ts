import {
  Controller,
  Res,
  Get,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { UsersService } from './users.service';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  @UseGuards(AuthenticatedGuard)
  async requestProfile(@Param('userId') userId: number, @Res() res: Response) {
    const user = await this.usersService.getUser(Number(userId));
    const statusCode = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode).send(user);
  }
}
