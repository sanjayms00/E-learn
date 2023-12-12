import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class ClientAuthController {

    @Post('login')
    adminLogin(){
        return [
            {
                name: "sanjay",
                email: "sanjay@gmail.com"
            },
            {
                name: "ajay",
                email: "ajay@gmail.com"
            },  
        ]
    }

    @Post('signUp')
    register(@Body() data){
        return data
    }
}
