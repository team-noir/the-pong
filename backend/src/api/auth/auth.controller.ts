import {
  Controller,
  Res,
  Req,
  Body,
  Get,
  Post,
  Delete,
  UseGuards,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FtOauthGuard } from '@/guards/ft-oauth.guard';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import {
  ApiOperation,
  ApiTags,
  ApiHeader,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiAcceptedResponse,
  ApiNotAcceptableResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { MyDto } from '../my/dtos/my.dto';
import { AuthService } from './auth.service';
import { twoFaDto } from './dtos/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('42')
  @ApiOkResponse({
    description: 'Redirect to 42 api. Set cookie.',
  })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign in 42 api' })
  @UseGuards(FtOauthGuard)
  ftAuth() {
    return;
  }

  @Get('42/return')
  @ApiOperation({ summary: '42 api callback' })
  @ApiOkResponse({ description: 'Get access token' })
  @ApiHeader({ name: 'Authorization', description: 'jwt' })
  @UseGuards(FtOauthGuard)
  async auth(@Req() req, @Res({ passthrough: true }) res) {
    try {
      return this.authService.auth(req, res);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Get('2fa')
  @ApiOperation({ summary: 'Generate 2FA QR code and key' })
  @ApiOkResponse({ description: 'Generate 2FA QR code and key' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async getTwoFaQrCode(@Req() req, @Res({ passthrough: true }) res) {
    try {
      const { secret, qrCode } = await this.authService.generateTwoFaSecret(
        req.user.id
      );
      res.status(HttpStatus.OK).send({ qr: qrCode, key: secret });
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post('2fa')
  @ApiOperation({ summary: 'Verify 2FA code. Turn on 2FA if not on' })
  @ApiAcceptedResponse({ description: 'Verify 2FA code' })
  @ApiNotAcceptableResponse({ description: 'Wrong 2FA code' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  async verifyTwoFa(
    @Req() req,
    @Body() body: twoFaDto,
    @Res({ passthrough: true }) res
  ) {
    try {
      const user: MyDto | null = await this.authService.authWhoami(req);
      if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }
      const { code } = body;
      const isCodeValid = await this.authService.verifyTwoFa(user.id, code);
      if (!isCodeValid) {
        throw new HttpException('Wrong 2FA code', HttpStatus.NOT_ACCEPTABLE);
      }

      const isTwoFaOn = await this.authService.isTwoFaOn(user.id);
      if (!isTwoFaOn) {
        await this.authService.turnOnTwoFa(user.id);
      }
      const jwt = this.authService.signJwt({
        id: user.id,
        nickname: user.nickname,
        isTwoFactor: true,
        isVerifiedTwoFactor: true,
      });
      await this.authService.setJwt(res, jwt);

      res.status(HttpStatus.ACCEPTED).send();
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Delete('2fa')
  @ApiOperation({ summary: 'Turn off 2FA' })
  @ApiOkResponse({ description: 'Turn off 2FA' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async turnOffTwoFa(@Req() req, @Res({ passthrough: true }) res) {
    try {
      await this.authService.turnOffTwoFa(req.user.id);

      const jwt = this.authService.signJwt({
        id: req.user.id,
        nickname: req.user.nickname,
        isTwoFactor: false,
        isVerifiedTwoFactor: false,
      });
      await this.authService.setJwt(res, jwt);

      res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post('login/anonymous')
  @ApiOperation({ summary: 'Login as an anonymous user' })
  @ApiOkResponse({
    description:
      'Login as an anonymous user. Set cookie and redirect to app main page',
  })
  async loginAnonymous(@Res({ passthrough: true }) res) {
    try {
      return await this.authService.login(res);
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @ApiNoContentResponse({ description: 'Logout. Remove cookie.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized(No JWT)' })
  @UseGuards(AuthenticatedGuard)
  async logout(@Res({ passthrough: true }) res) {
    try {
      this.authService.logout(res);
      res.status(HttpStatus.NO_CONTENT);
      return;
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }
}
