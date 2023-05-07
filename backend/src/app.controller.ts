import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller('/health-check')
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Health check' })
  @ApiOkResponse({ description: 'Health check' })
  healthCheck(@Res({ passthrough: true }) res) {
    res.status(HttpStatus.OK);
    return { status: 'ok' };
  }
}
