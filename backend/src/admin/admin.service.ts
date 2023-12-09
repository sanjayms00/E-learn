import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from './schemas/admin.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { AdminDto } from 'src/student/dto/admin.dto';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin.name) 
        private adminModel: Model<Admin>,
        private jwtService: JwtService
    ){}

    async register(registerData: AdminDto): Promise<{access_token : string}>
    {
        const { userName, email, password } = registerData
        
        const isAdminExist = await this.adminModel.findOne({email})

        if(isAdminExist){
            throw new ConflictException("Already registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)    //salt
        
        const admin = await this.adminModel.create({
            userName,
            email,
            password: hashedPassword, 
            status: true
        })
        const payLoad = {
            id: admin._id,
            // role: 'admin'
        }
        console.log("here....")
        return {
            access_token: await this.jwtService.sign(payLoad)
        };
    }

    async login(logindata): Promise<{access_token : string}>
    {
        const {email, password } = logindata 

        const admin = await this.adminModel.findOne({email})
        console.log(admin)
        if(!admin){
            throw new UnauthorizedException("Unauthorized user")
        }
        
        const isPasswordMatch = await bcrypt.compare(password, admin.password)

        if(!isPasswordMatch){
            throw new UnauthorizedException("invalid user and password")
        }

        return {
            access_token: await this.jwtService.signAsync({id: admin._id}),
        };

    }


}
