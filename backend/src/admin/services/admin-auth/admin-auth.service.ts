import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Admin } from 'src/admin/schema/admin.schema';
// import { loginType } from 'src/types/type';

@Injectable()
export class AdminAuthService {

    constructor(
        
        private jwtservice: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<object> {
        // const user = await this.clientService.findOne(username);
        // if (user && user.password === pass) {
        //     const { password, ...result } = user;
        //     return result;
        // }
        return null;
    }

    async login(client) {
        // const payload = { username: client.username, sub: client.userId }
        
            //const access_token = await this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_CLIENT });
    }
}
