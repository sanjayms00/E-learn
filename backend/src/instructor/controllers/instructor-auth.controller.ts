import { Body, Controller, Post } from '@nestjs/common';
// import { LoginDto } from 'src/common/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { InstructorAuthService } from 'src/instructor/services/instructor-auth.service';
import { LoginDto } from 'src/common/dtos/loginDto';

@Controller('auth')
export class InstructorAuthController {
  constructor(private instructorAuthService: InstructorAuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto) {
    return await this.instructorAuthService.signUp(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    return await this.instructorAuthService.login(loginData);
  }

}