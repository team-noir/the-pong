import {
  Controller,
  Get,
  Post,
  Patch,
  Req,
  Res,
  Body,
  UseGuards,
  HttpStatus,
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

  @Post('profile-image')
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './profile-images',
        filename: (req, file, cb) => {
          const ext: string = file.mimetype.split('/')[1];
          return cb(null, `${req.user.id}.${ext}`);
        },
      }),
    })
  )
  async uploadProfileImage(
    @Req() req,
    @Res({ passthrough: true }) res,
    @UploadedFile() file
  ) {
    const statusCode = file ? HttpStatus.OK : HttpStatus.NOT_FOUND;
    res.status(statusCode);
    return await this.myService.uploadProfileImage(req.user.id, file);
  }
}
