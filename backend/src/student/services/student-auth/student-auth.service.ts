import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/student/schema/student.schema';
import { SignupDto } from 'src/common/dtos/signDto';
// import { LoginDto } from 'src/client/dtos/loginDto';
import { userAuthReturn } from 'src/common/types/type';
import { MailerService } from '@nestjs-modules/mailer';
import { error } from 'console';



@Injectable()
export class StudentAuthService {

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private jwtService: JwtService,
    private mailService: MailerService
  ) { }



  //signup student
  async signUp(signUpData: SignupDto) {

    const { fullName, mobile, email } = signUpData;

    const isClient = await this.studentModel.findOne({ email: signUpData.email });

    if (isClient) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    const user = await this.studentModel.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      status: true,
    });

    if (!user) throw new Error("Unable to save the data")
    console.log(user)
    return user
  }

  //verify otp
  async verifyOtp(data): Promise<userAuthReturn> {
    const findStudent = await this.studentModel.findOne(
      {
        email: data.email,
        otp: data.otp,
        expirationTime: { $gte: new Date() }
      },
      { password: 0, otp: 0 }
    );

    if (!findStudent) throw new NotFoundException("Student Not Found or otp expired");

    console.log(findStudent)

    const access_token =
      await this.jwtService.sign({ id: findStudent._id }, { secret: process.env.JWT_SECRET_CLIENT });

    if (!access_token) throw new HttpException('Token not found', HttpStatus.FORBIDDEN);

    return {
      access_token,
      user: findStudent
    };
  }

  //login student ot instructor
  async login(loginData): Promise<userAuthReturn> {

    const client = await this.studentModel.findOne({ email: loginData.email });

    if (!client) throw new UnauthorizedException('Invalid email or password');

    if (client.status === false) throw new ForbiddenException('Access denied, User is blocked');

    const isPasswordMatched = await bcrypt.compare(loginData.password, client.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: client._id }, { secret: process.env.JWT_SECRET_CLIENT });

    const clientObject = client.toJSON();

    const { password, __v, ...result } = clientObject;

    return {
      access_token,
      user: result
    };
  }

  //send otp
  async sendOTP(email: string): Promise<void> {

    const currentTime = new Date();
    const expirationTime = new Date(currentTime.getTime() + 2 * 60000); // 2 minutes in milliseconds

    //otp generate
    const otp = Math.floor(1000 + Math.random() * 9000);

    const setOtp = await this.studentModel.updateOne(
      { email },
      {
        $set: {
          otp,
          creationTime: currentTime,
          expirationTime: expirationTime,
        }
      }
    )

    if (!setOtp) throw new Error("OTP generation failed")

    try {
      await this.mailService.sendMail({
        to: email,
        subject: 'Welcome tp Elearn, confirm your otp',
        html: `<p>Hello ${email},</p><p>Your OTP is: ${otp}</p>`,
      });
    } catch (error) {

      console.error('Error sending email:', error);
      throw new Error('Mail not sent successfully');
    }
  }

}