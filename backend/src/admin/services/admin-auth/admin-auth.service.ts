import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdmminDto } from 'src/admin/dtos/adminDto';
import { Admin } from 'src/admin/schema/admin.schema';
import { LoginDto } from 'src/client/dtos/loginDto';

// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Admin } from 'src/admin/schema/admin.schema';
// import { loginType } from 'src/types/type';

@Injectable()
export class AdminAuthService {

    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        private jwtservice: JwtService
    ) { }

    async registerAdmin(data: AdmminDto): Promise<object> {
        console.log(data);
        this.adminModel.create()
    }

    async login(adminLogindata: LoginDto) {
        // console.log(adminLogindata)
        return {status :true}
            //const access_token = await this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_CLIENT });
    }
}
