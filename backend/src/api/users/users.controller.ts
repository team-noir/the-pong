import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  UseGuards,
  Param,
  HttpStatus,
  HttpException,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  StreamableFile,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiQuery,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { UsersService } from './users.service';
import { Response } from 'express';
import { UserDto } from './dtos/users.dto';
import { AchievementDto } from './dtos/achievement.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiQuery({
    name: 'q',
    required: false,
    description: 'Search users by nickname',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number\n- Default: `1`',
  })
  @ApiQuery({
    name: 'per_page',
    required: false,
    description: 'Number of users per page\n- Default: `30`',
  })
  @ApiOkResponse({ description: 'Get users', type: [UserDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async requestUsers(
    @Req() req,
    @Res() res: Response,
    @Query('q') q?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('per_page', new DefaultValuePipe(30), ParseIntPipe) per_page?: number
  ) {
    try {
      const myUserId = req.user.id;
      const userQuery = { q, page, per_page };
      const users: UserDto[] = await this.usersService.getUsers(
        myUserId,
        userQuery
      );
      res.status(HttpStatus.OK).send(users);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiOkResponse({ description: 'Get user', type: UserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async requestProfile(
    @Req() req,
    @Param('userId') userId: number,
    @Res() res: Response
  ) {
    try {
      const myUserId = req.user.id;
      const user: UserDto = await this.usersService.getUser(myUserId, userId);
      const statusCode = user ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      res.status(statusCode).send(user);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId/profile-image')
  @ApiOperation({
    summary: 'Get profile image',
    description:
      '```js\n// prevent caching\nconst random = Math.random();\n<img src=`/api/v1/users/1/profile-image?v=${random}` />\n```',
  })
  @ApiOkResponse({ description: 'Get profile image', type: StreamableFile })
  @ApiBadRequestResponse({
    description:
      'Bad request\n- User does not have a profile image\n- User does not exist',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async downloadProfileImage(
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res: Response
  ): Promise<StreamableFile> {
    try {
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
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /** Achievements */

  @Get(':userId/achievements')
  @ApiOperation({ summary: 'Get achievements' })
  @ApiOkResponse({ description: 'Get achievements', type: [AchievementDto] })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async requestAchievements(
    @Param('userId') userId: number,
    @Res() res: Response
  ) {
    try {
      const achievements: AchievementDto[] =
        await this.usersService.getAchievements(Number(userId));
      const statusCode = achievements ? HttpStatus.OK : HttpStatus.NOT_FOUND;
      res.status(statusCode).send(achievements);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // TODO: remove this endpoint
  @Post(':userId/achievements/:achievementId')
  @ApiOperation({ summary: 'TEST - Add achievement' })
  @ApiCreatedResponse({ description: 'ADD achievement', type: AchievementDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async requestAchievement(
    @Param('userId') userId: number,
    @Param('achievementId') achievementId: number,
    @Res() res: Response
  ) {
    try {
      const achievement: any = await this.usersService.addAchievement(
        Number(userId),
        Number(achievementId)
      );
      res.status(HttpStatus.CREATED).send(achievement);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':userId/status')
  async getUserStatus(
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      const data = await this.usersService.getUserStatus(userId);
      res.status(HttpStatus.OK);
      return data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
