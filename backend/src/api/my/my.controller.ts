import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Req,
  Param,
  Query,
  Res,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiBody,
} from '@nestjs/swagger';
import { existsSync, mkdirSync } from 'fs';
import { readdir, unlink } from 'node:fs/promises';
import { diskStorage } from 'multer';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { SettingDto, CheckSettingDto, FileUploadDto } from './dtos/setting.dto';
import { MyService } from './my.service';
import { MyDto, FollowDto, BlockDto } from './dtos/my.dto';
import { PROFILE_PATH, PROFILE_IMAGE_MAX_SIZE } from '@const';
import { PageRequestDto } from '../dtos/pageRequest.dto';

@ApiTags('my')
@Controller('my')
export class MyController {
  constructor(private myService: MyService) {}

  @Get('whoami')
  @ApiOperation({ summary: 'Get my profile' })
  @ApiOkResponse({ description: 'Get my profile', type: MyDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  async whoami(@Req() req, @Res({ passthrough: true }) res) {
    const user: MyDto = await this.myService.whoami(req);
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    res.status(HttpStatus.OK);
    return user;
  }

  @Patch('settings')
  @ApiOperation({ summary: 'Set my profile' })
  @ApiOkResponse({ description: 'Successfully set my profile', type: MyDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async setMyProfile(
    @Req() req,
    @Body() body: SettingDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const user: MyDto = await this.myService.setMyProfile(req, body, res);
      res.status(HttpStatus.OK);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('settings/check')
  @ApiOperation({ summary: 'Check profile duplication(nickname)' })
  @ApiOkResponse({
    description:
      'Duplicate check results. Return `true` if there is no duplicate data.',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async checkMyProfile(
    @Body() body: CheckSettingDto,
    @Res({ passthrough: true }) res
  ) {
    const { nickname } = body;
    const resultNickname = await this.myService.checkMyProfile(
      'nickname',
      nickname
    );

    res.status(HttpStatus.OK);
    return { nickname: resultNickname };
  }

  @Post('profile-image')
  @ApiOperation({ summary: 'Upload profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiCreatedResponse({ description: 'Successfully created profile image' })
  @ApiBadRequestResponse({ description: 'Bad request\n- [TODO]Invalid file' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @ApiBody({ description: 'Profile image binary file', type: FileUploadDto })
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: async (req, _, cb) => {
          try {
            const dir = `${PROFILE_PATH}/${req.user.id}`;
            if (!existsSync(dir)) {
              await mkdirSync(dir, { recursive: true });
            }
            // remove previous image in dir
            for (const file of await readdir(dir)) {
              await unlink(`${dir}/${file}`);
            }
            return cb(null, dir);
          } catch (error) {
            console.log(error);
          }
        },
        filename: (_, file, cb) => {
          try {
            const ext: string = file.mimetype.split('/')[1];
            // YYYYMMDDHHMMSS
            const now = new Date()
              .toISOString()
              .replace(/:/g, '')
              .replace(/\./g, '');
            return cb(null, `${now}.${ext}`);
          } catch (error) {
            console.log(error);
          }
        },
      }),
    })
  )
  async uploadProfileImage(
    @Req() req,
    @Res({ passthrough: true }) res,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: /^image\// }),
          new MaxFileSizeValidator({ maxSize: PROFILE_IMAGE_MAX_SIZE }),
        ],
      })
    )
    file
  ) {
    try {
      const statusCode = file ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST;
      await this.myService.uploadProfileImage(req.user.id, file);
      res.status(statusCode);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('profile-image')
  @ApiOperation({ summary: 'Delete profile image' })
  @ApiNoContentResponse({ description: 'Successfully deleted profile image' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async deleteProfileImage(@Req() req, @Res({ passthrough: true }) res) {
    try {
      await this.myService.deleteProfileImage(req.user.id);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('following')
  @ApiOperation({ summary: 'Get following list' })
  @ApiOkResponse({
    description: 'Get following list. Empty array if no following.',
    type: [FollowDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async getFollowing(
    @Req() req, 
    @Query() query: PageRequestDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const list = await this.myService.getFollowing(req, query);
      res.status(HttpStatus.OK);
      return list;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('following/:userId')
  @ApiOperation({ summary: 'Follow user' })
  @ApiNoContentResponse({ description: 'Successfully followed user' })
  @ApiBadRequestResponse({ description: 'Bad request\n- Invalid user id' })
  @UseGuards(AuthenticatedGuard)
  async putFollowing(
    @Req() req,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.myService.putFollowing(req);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('following/:userId')
  @ApiOperation({ summary: 'Unfollow user' })
  @ApiNoContentResponse({ description: 'Successfully unfollowed user' })
  @ApiBadRequestResponse({
    description: 'Bad request\n- Invalid user id\n- Not following user id',
  })
  @UseGuards(AuthenticatedGuard)
  async deleteFollowing(
    @Req() req,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.myService.deleteFollowing(req);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('blocks')
  @ApiOperation({ summary: 'Get block list' })
  @ApiOkResponse({
    description: 'Get block list. Empty array if no block.',
    type: [BlockDto],
  })
  @UseGuards(AuthenticatedGuard)
  async getBlocks(
    @Req() req, 
    @Query() query: PageRequestDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const list = await this.myService.getBlocks(req, query);
      res.status(HttpStatus.OK);
      return list;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('blocks/:userId')
  @ApiOperation({ summary: 'Block user' })
  @ApiNoContentResponse({ description: 'Successfully blocked user' })
  @ApiBadRequestResponse({ description: 'Bad request\n- Invalid user id' })
  @UseGuards(AuthenticatedGuard)
  async putBlocks(
    @Req() req,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.myService.putBlocks(req);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('blocks/:userId')
  @ApiOperation({ summary: 'Unblock user' })
  @ApiNoContentResponse({ description: 'Successfully unblocked user' })
  @ApiBadRequestResponse({
    description: 'Bad request\n- Invalid user id\n- Not blocking user id',
  })
  @UseGuards(AuthenticatedGuard)
  async deleteBlocks(
    @Req() req,
    @Param('userId') userId: number,
    @Res({ passthrough: true }) res
  ) {
    try {
      await this.myService.deleteBlocks(req);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
