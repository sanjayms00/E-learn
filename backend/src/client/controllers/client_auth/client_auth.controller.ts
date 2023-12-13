import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from 'src/client/dtos/loginDto';
import { SignupDto } from 'src/client/dtos/signDto';
import { ClientAuthService } from 'src/client/services/client-auth/client-auth.service';

@Controller('auth')
export class ClientAuthController {
  constructor(private clientAuthService : ClientAuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<{ access_token: string }> {
    return this.clientAuthService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    return this.clientAuthService.login(loginDto);
  }
}