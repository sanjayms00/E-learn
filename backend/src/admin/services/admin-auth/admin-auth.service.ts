import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { loginType } from 'src/types/type';

@Injectable()
export class AdminAuthService {

    constructor(
        private jwtService: JwtService
    ){}

    async loginService(data: any) {
        const payload = { username: data.username, sub: data.userId };
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async validateUser(username, password) {
        console.log(username, password);
        
        return {id: 1, email: "sanjayms@gmail.com"};
    }
}
