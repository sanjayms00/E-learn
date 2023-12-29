import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Student } from 'src/student/schema/student.schema';
import { SignupDto } from 'src/common/dtos/signDto';
// import { LoginDto } from 'src/client/dtos/loginDto';
import { userAuthReturn } from 'src/types/type';

@Injectable()
export class StudentAuthService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
    private jwtService: JwtService,
  ) { }

  //signup student
  async signUp(signUpData: SignupDto): Promise<userAuthReturn> {

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

    const access_token = await this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_CLIENT });

    const clientObject = user.toJSON();

    const { password, __v, ...result } = clientObject;

    return {
      access_token,
      user: result
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
}