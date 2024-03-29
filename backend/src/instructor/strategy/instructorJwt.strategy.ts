import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Instructor } from '../schema/instructor.schema';

@Injectable()
export class instructorJwtStrategy extends PassportStrategy(Strategy, 'instructor-jwt') {
  constructor(
    @InjectModel(Instructor.name)
    private userModel: Model<Instructor>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_INSTRUCTOR,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.userModel.findById(id);

    // if (!user.status) {
    //   throw new UnauthorizedException('Access denied.');
    // }

    if (!user) {
      throw new UnauthorizedException('Access denied.');
    }

    return user;
  }
}