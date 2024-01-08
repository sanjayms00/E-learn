import { Body, Controller, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
// import { LoginDto } from 'src/student/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { StudentAuthService } from 'src/student/services/student-auth/student-auth.service';
import { userAuthReturn } from 'src/common/types/type';

@Controller('api/auth')
export class StudentAuthController {
  constructor(private studentAuthService: StudentAuthService) { }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto) {
    try {
      const registerStudent = await this.studentAuthService.signUp(signUpDto);
      const otpresult = this.studentAuthService.sendOTP(registerStudent.email)
      if (!otpresult) throw new Error("OTP not sent")

      return { email: registerStudent.email }
    }
    catch (error) {
      console.log(error.message)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/verifyOtp')
  async verifyOtp(@Body() otpData): Promise<userAuthReturn> {
    const studentData = await this.studentAuthService.verifyOtp(otpData);
    return studentData
  }

  @Put('/resendOtp')
  async resendOtp(@Body() otpData) {
    await this.studentAuthService.sendOTP(otpData.email);
  }



  @Post('/login')
  async login(@Body() loginData): Promise<userAuthReturn> {
    console.log(loginData)
    return await this.studentAuthService.login(loginData);
  }

  // @Post('/forgot-password')
  // forgotPassword(@Body() loginData: LoginDto): Promise<userAuthReturn> {
  //   return this.studentAuthService.login(loginData);
  // }

}