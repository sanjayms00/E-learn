import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from '../services/admin-auth/admin-auth.service';

@Injectable()
export class adminLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AdminAuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<object> {
        console.log("email", email, "password", password)
        const user = await this.authService.validateUser(email, password);
        console.log(user);
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}