import { Controller, Res, Req, Get, Post, UseGuards } from '@nestjs/common';
import { FtOauthGuard } from '../../guards/ft-oauth.guard';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('42')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign in 42 api' })
  @UseGuards(FtOauthGuard)
  ftAuth() {
    return;
  }

  @Get('42/return')
  @ApiOperation({ summary: '42 api callback' })
  @ApiResponse({ status: 200, description: 'Get access token' })
  @ApiHeader({ name: 'Authorization', description: 'jwt' })
  @UseGuards(FtOauthGuard)
  async auth(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.auth(req, res);
  }

  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req);
  }
}