import { Body, Controller, Post } from '@nestjs/common';
// import { LoginDto } from 'src/client/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { ClientAuthService } from 'src/client/services/client-auth/client-auth.service';
import { userAuthReturn } from 'src/types/type';

@Controller('api/auth')
export class ClientAuthController {
  constructor(private clientAuthService : ClientAuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<userAuthReturn> {
    console.log(signUpDto)
    return this.clientAuthService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginData): Promise<userAuthReturn> {
    console.log(loginData)
    return this.clientAuthService.login(loginData);
  }

  // @Post('/forgot-password')
  // forgotPassword(@Body() loginData: LoginDto): Promise<userAuthReturn> {
  //   return this.clientAuthService.login(loginData);
  // }

}