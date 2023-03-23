import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Req,
  Param,
  Res,
  Body,
  UseGuards,
  HttpStatus,
  HttpException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { SettingDto } from './dtos/setting.dto';
import { MyService } from './my.service';
import { MyDto } from './dtos/my.dto';
import { PROFILE_PATH } from '../../const';

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
    res.status(HttpStatus.OK).send(user);
  }

  @Patch('settings')
  @UseGuards(AuthenticatedGuard)
  async setMyProfile(@Req() req, @Body() body: SettingDto, @Res() res) {
    const user: MyDto = await this.myService.setMyProfile(req, body);
    res.status(HttpStatus.OK).send(user);
  }

  @Post('profile-image')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: PROFILE_PATH,
        filename: (req, file, cb) => {
          const ext: string = file.mimetype.split('/')[1];
          return cb(null, `${req.user.id}.${ext}`);
        },
      }),
    })
  )
  async uploadProfileImage(@Req() req, @Res() res, @UploadedFile() file) {
    const statusCode = file ? HttpStatus.NO_CONTENT : HttpStatus.BAD_REQUEST;
    await this.myService.uploadProfileImage(req.user.id, file);
    res.status(statusCode).send();
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

  @Get('blocks')
  @UseGuards(AuthenticatedGuard)
  async getBlocks(@Req() req) {
    return this.myService.getBlocks(req);
  }

  @Put('blocks/:userId')
  @UseGuards(AuthenticatedGuard)
  async putBlocks(@Req() req, @Param('userId') userId: number, @Res() res) {
    try {
      await this.myService.putBlocks(req);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('blocks/:userId')
  @UseGuards(AuthenticatedGuard)
  async deleteBlocks(@Req() req, @Param('userId') userId: number, @Res() res) {
    try {
      await this.myService.deleteBlocks(req);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
