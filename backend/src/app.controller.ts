import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('auth/login')
  async login(@Body() loginData): Promise<object> {
    return this.appService.findClient(loginData);
  }
}
