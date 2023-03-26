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
  StreamableFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { UsersService } from './users.service';
import { Response } from 'express';
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
  ): Promise<StreamableFile> {
    const result = await this.usersService.downloadProfileImage(userId);
    if (!result) {
      throw new HttpException(
        'No profile image file found',
        HttpStatus.NOT_FOUND
      );
    }
    res.set({
      'Content-Type': `${result.mimetype}`,
      'Content-Disposition': `attachment; filename=${result.filename}`,
      'Cache-Control': 'no-cache, max-age=0',
    });
    return new StreamableFile(result.file);
  }
}
