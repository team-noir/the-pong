import {
  Controller,
  Res,
  Get,
  UseGuards,
  Param,
  HttpStatus,
  HttpException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
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

  @Get()
  @UseGuards(AuthenticatedGuard)
  async requestUsers(
    @Res() res: Response,
    @Query('q') q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('per_page', new DefaultValuePipe(30), ParseIntPipe) per_page?: number
  ) {
    try {
      const users: UserDto[] = await this.usersService.getUsers({
        q,
        page,
        per_page,
      });
      res.status(HttpStatus.OK).send(users);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  @UseGuards(AuthenticatedGuard)
  async requestProfile(@Param('userId') userId: number, @Res() res: Response) {
    const user: UserDto = await this.usersService.getUser(Number(userId));
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
