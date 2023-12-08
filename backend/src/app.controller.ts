import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from the general API!';
  }
}