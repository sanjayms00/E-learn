import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Client } from '../schema/client.schema';

@Injectable()
export class ClientJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Client.name)
    private userModel: Model<Client>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_CLIENT,
    });
  }

  async validate(payload) {
    const { id } = payload;
    console.log(payload)

    const user = await this.userModel.findById(id);

    if (!user) {
      throw new UnauthorizedException('Access denied.');
    }

    return user;
  }
}