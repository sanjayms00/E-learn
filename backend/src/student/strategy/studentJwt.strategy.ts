import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Student } from '../schema/student.schema';

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<Student>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_CLIENT,
    });
  }

  async validate(payload) {
    const { id } = payload;
    console.log("student", payload)

    const user = await this.studentModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Access denied.');
    }

    return user;
  }
}