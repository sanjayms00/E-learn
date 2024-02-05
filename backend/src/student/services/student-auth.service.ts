import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/student/schema/student.schema';
import { SignupDto } from 'src/common/dtos/signDto';
import { userAuthReturn } from 'src/common/types/type';
import { MailerService } from '@nestjs-modules/mailer';
import { Token } from '../schema/token.schema';
import * as crypto from 'crypto';


@Injectable()
export class StudentAuthService {

  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private jwtService: JwtService,
    private mailerlService: MailerService,
    @InjectModel(Token.name)
    private tokenModel: Model<Token>,
  ) { }



  //signup student
  async signUp(signUpData: SignupDto) {

    try {
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
      return user
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  //verify otp
  async verifyOtp(data): Promise<userAuthReturn> {
    try {
      const findStudent = await this.studentModel.findOne(
        {
          email: data.email,
          otp: data.otp,
          expirationTime: { $gte: new Date() }
        },
        { password: 0, otp: 0 }
      );

      if (!findStudent) throw new NotFoundException("Student Not Found or otp expired");

      const access_token =
        await this.jwtService.sign({ id: findStudent._id }, { secret: process.env.JWT_SECRET_CLIENT });

      if (!access_token) throw new HttpException('Token not found', HttpStatus.FORBIDDEN);

      return {
        access_token,
        user: findStudent
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //login student ot instructor
  async login(loginData): Promise<userAuthReturn> {
    try {
      const client = await this.studentModel.findOne({ email: loginData.email });

      if (!client) throw new UnauthorizedException('Invalid email or password');

      if (client.status === false) throw new ForbiddenException('Access denied, User is blocked');

      const isPasswordMatched = await bcrypt.compare(loginData.password, client.password);

      if (!isPasswordMatched) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const access_token = this.jwtService.sign({ id: client._id }, { secret: process.env.JWT_SECRET_CLIENT });

      const clientObject = client.toJSON();

      const { password, courses, __v, ...result } = clientObject;

      return {
        access_token,
        user: result
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
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
      await this.mailerlService.sendMail({
        to: email,
        subject: 'Welcome to Elearn, confirm your otp',
        html: `<p>Hello ${email},</p><p>Your OTP is: ${otp}</p>`,
      });

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  //forgot Password
  async forgotPassword(email: string) {
    try {
      if (!email) {
        // throw exception
        throw new NotFoundException("email is not found");
      }

      //find user
      const student = await this.studentModel.findOne({ email })

      if (!student) {
        throw new NotFoundException("Student is not found")
      }

      const token = crypto.randomBytes(48).toString('base64url');

      //store in token and otherData
      const tokenSaveResult = await this.createForgottenpasswordToken(email, token, student._id)

      //send mail
      const url = `http://localhost:4200/reset-password/${token}`;

      await this.mailerlService.sendMail({
        to: email,
        subject: 'Welcome to E-learn! Reset your password',
        html: `<p>Hello ${student.fullName},</p> <p>Welcome to Nice App! Please click the following link to reset your password:</p> <a href="${url}" target="_blank">Reset Password</a>
        `,
      });
    } catch (error) {
      throw new HttpException("Mail not sent successfully", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async createForgottenpasswordToken(email: string, token: string, id: string) {
    try {
      const forgotPasswordSave = await this.tokenModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            email,
            id,
            token
          }
        },
        {
          upsert: true, new: true
        }
      )

      if (!forgotPasswordSave) {
        throw new HttpException("failed to save the token", HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return forgotPasswordSave

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async resetPassword(token: string, password) {
    try {
      const studentEmail = await this.tokenModel.findOne({ token }, { email: 1 })

      if (!studentEmail) throw new NotFoundException("Student is not found")

      const hashedPassword = await bcrypt.hash(password, 10);

      const resetPassword = await this.studentModel.updateOne(
        { email: studentEmail.email },
        {
          $set: {
            password: hashedPassword
          }
        }
      )

      if (!resetPassword) throw new Error("Unable to reset the password")

      return { status: true, message: "password reset successful" }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}