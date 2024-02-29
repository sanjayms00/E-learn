import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Admin } from '../schema/admin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class adminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
    constructor(
        @InjectModel(Admin.name)
        private adminModel: Model<Admin>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_ADMIN,
        });
    }

    async validate(payload) {

        const { id } = payload;

        const user = await this.adminModel.findById(id);

        if (!user) {
            throw new UnauthorizedException('Access denied.');
        }

        return user;
    }
}