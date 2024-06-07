import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Test Server')
  @Get()
  checkServer(): object {
    return this.appService.checkServer();
  }
}
