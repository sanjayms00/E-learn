import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/services/client/client.service';

// import { JwtService } from '@nestjs/jwt';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Admin } from 'src/admin/schema/admin.schema';
// import { loginType } from 'src/types/type';

@Injectable()
export class AdminAuthService {

    constructor(
        private clientService: ClientService,
        private jwtservice: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<object> {
        const user = await this.clientService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(client) {
        const payload = { username: client.username, sub: client.userId }
        return {
            access_token: this.jwtservice.sign(payload)
        }
    }


    // async loginService(data: any) { 
    //     const payload = { email: data.email, sub: data.id };
    //     return {
    //         payload
    //         // access_token: this.jwtService.sign(payload)
    //     }
    // }

    // async validateUser(email, password) {
    //     // const user = await this.adminModel.findOne({email})
    //     const user = {password : 123456, email:"sanjay@gmail.com", id: 1}
    //     if(!user) throw new UnauthorizedException('Unautorized user')

    //     if(user.password !== password) throw new UnauthorizedException('Email or Password is incorrect');

    //     return user
    // }
}
