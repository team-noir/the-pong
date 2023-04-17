import {
  Controller,
  Res,
  Req,
  Get,
  Post,
  UseGuards,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { FtOauthGuard } from '../../guards/ft-oauth.guard';
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import {
  ApiOperation,
  ApiTags,
  ApiHeader,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

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

  @Post('login/anonymous')
  @ApiOperation({ summary: 'Login as an anonymous user' })
  @ApiNoContentResponse({ description: 'Login as an anonymous user. Remove cookie.' })
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
