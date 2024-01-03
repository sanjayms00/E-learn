import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
// import { LoginDto } from 'src/student/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { StudentAuthService } from 'src/student/services/student-auth/student-auth.service';
import { userAuthReturn } from 'src/common/types/type';

@Controller('api/auth')
export class StudentAuthController {
  constructor(private studentAuthService: StudentAuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto): Promise<userAuthReturn> {
    try {
      const registerStudent = await this.studentAuthService.signUp(signUpDto);

      console.log(registerStudent)

      const otpresult = this.studentAuthService.sendOTP(
        registerStudent.user.email,
        registerStudent.user.fullName,
        registerStudent.user._id)

      if (!otpresult) throw new Error("OTP not sent")

      return registerStudent

    } catch (error) {
      console.log(error.message)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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