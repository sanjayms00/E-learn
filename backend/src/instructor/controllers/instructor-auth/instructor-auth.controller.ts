import { Body, Controller, Post } from '@nestjs/common';
// import { LoginDto } from 'src/common/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { InstructorAuthService } from 'src/instructor/services/instructor-auth/instructor-auth.service';
import { LoginDto } from 'src/common/dtos/loginDto';

@Controller('api/instructor/auth')
export class InstructorAuthController {
  constructor(private instructorAuthService : InstructorAuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto) {
    return this.instructorAuthService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginData: LoginDto) {
    console.log(loginData)
    return this.instructorAuthService.login(loginData);
  }

  // @Post('/forgot-password')
  // forgotPassword(@Body() loginData: LoginDto): Promise<userAuthReturn> {
  //   return this.instructorAuthService.login(loginData);
  // }

}