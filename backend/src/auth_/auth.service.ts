
import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
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


}