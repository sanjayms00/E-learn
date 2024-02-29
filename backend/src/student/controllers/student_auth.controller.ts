import { Body, Controller, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
// import { LoginDto } from 'src/student/dtos/loginDto';
import { SignupDto } from 'src/common/dtos/signDto';
import { StudentAuthService } from 'src/student/services/student-auth.service';
import { userAuthReturn } from 'src/common/types/type';

@Controller('auth')
export class StudentAuthController {

  constructor(private studentAuthService: StudentAuthService) { }

  //signup
  @Post('/signup')
  async signUp(@Body() signUpDto: SignupDto) {
    try {
      const registerStudent = await this.studentAuthService.signUp(signUpDto);
      const otpresult = this.studentAuthService.sendOTP(registerStudent.email)
      if (!otpresult) throw new Error("OTP not sent")

      return { email: registerStudent.email }
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //verify otp
  @Put('/verifyOtp')
  async verifyOtp(@Body() otpData): Promise<userAuthReturn> {
    const studentData = await this.studentAuthService.verifyOtp(otpData);
    return studentData
  }

  //resend otp
  @Put('/resendOtp')
  async resendOtp(@Body() data: { email: string }) {

    await this.studentAuthService.sendOTP(data.email);
  }

  //login
  @Post('/login')
  async login(@Body() loginData): Promise<userAuthReturn> {
    return await this.studentAuthService.login(loginData);
  }

  //forgot password
  @Post('/forgotPassword')
  async forgotPassword(@Body() data: { email: string }) {
    return this.studentAuthService.forgotPassword(data.email)
  }

  //reset password
  @Post('/resetPassword')
  async resetPassword(@Body() data: { token: string, password: string }) {
    return this.studentAuthService.resetPassword(data.token, data.password)
  }

}