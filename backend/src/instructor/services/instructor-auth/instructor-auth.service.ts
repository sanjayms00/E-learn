import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { SignupDto } from 'src/common/dtos/signDto';
// import { LoginDto } from 'src/client/dtos/loginDto';


@Injectable()
export class InstructorAuthService {
  constructor(
    @InjectModel(Instructor.name)
    private instructorModel: Model<Instructor>,
    private jwtService: JwtService,
  ) { }

  //signup student
  async signUp(signUpData: SignupDto){
    const { fullName, mobile, email } = signUpData;

    const isinstructor = await this.instructorModel.findOne({ email: signUpData.email });

    if (isinstructor) {
      throw new ConflictException('instructor already exist');
    }

    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    const instructor = await this.instructorModel.create({
      fullName,
      email,
      mobile,
      password: hashedPassword,
      status: true,
    });

    const access_token = await this.jwtService.sign({ id: instructor._id }, { secret: process.env.JWT_SECRET_INSTRUCTOR });

    const instructorObject = instructor.toJSON();

    const { password, __v, ...result } = instructorObject;

    return {
      access_token,
      user: result
    };
  }

  //login student ot instructor
  async login(loginData) {

    const instructor = await this.instructorModel.findOne({ email: loginData.email });

    if (!instructor) throw new UnauthorizedException('Invalid email or password');

    if (instructor.status === false) throw new ForbiddenException('Access denied, instructor is blocked');

    const isPasswordMatched = await bcrypt.compare(loginData.password, instructor.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: instructor._id }, { secret: process.env.JWT_SECRET_INSTRUCTOR });

    const instructorObject = instructor.toJSON();

    const { password, __v, ...result } = instructorObject;

    return {
      access_token,
      user : result
    };
  }
}