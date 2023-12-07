import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) 
        private adminModel: Model<Admin>,
        private jwtService: JwtService
    ){}

    async register(data)
    {
        return await this.adminModel.create(data)
    }

    async login(logindata){
        const {email, password } = logindata 

        const admin = await this.adminModel.findOne(email)

        if(!admin){
            throw new  UnauthorizedException("Unauthorized user")
        }
        
        const isPasswordMatch = await bcrypt.compare(password, admin.password)

        if(!isPasswordMatch){
            throw new  UnauthorizedException("invalid user and password")
        }

        return {
            token: await this.jwtService.signAsync({id: admin._id}),
        };

    }


}
