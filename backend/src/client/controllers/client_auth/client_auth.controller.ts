import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/client/dtos/loginDto';
import { SignupDto } from 'src/client/dtos/signDto';
import { ClientAuthService } from 'src/client/services/client-auth/client-auth.service';

@Controller('auth')
export class ClientAuthController {

    constructor(
        private clientAuthService : ClientAuthService
    ){}

    @Post('login')
    login(@Body() data: LoginDto){
        return this.clientAuthService.login(data)
    }

    @Post('signUp')
    signUp(@Body() data: SignupDto){
        return this.clientAuthService.register(data)
    }
}
