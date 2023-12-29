import { Body, Controller, Post } from '@nestjs/common';
// import { LoginDto } from 'src/student/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { StudentAuthService } from 'src/student/services/student-auth/student-auth.service';
import { userAuthReturn } from 'src/types/type';

@Controller('api/auth')
export class StudentAuthController {
  constructor(private studentAuthService : StudentAuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignupDto): Promise<userAuthReturn> {
    console.log(signUpDto)
    return this.studentAuthService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginData): Promise<userAuthReturn> {
    console.log(loginData)
    return this.studentAuthService.login(loginData);
  }

  // @Post('/forgot-password')
  // forgotPassword(@Body() loginData: LoginDto): Promise<userAuthReturn> {
  //   return this.studentAuthService.login(loginData);
  // }

}