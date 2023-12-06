import { Body, Controller, Get } from '@nestjs/common';
import { loginDataInterface } from 'src/interfaces/common.interface';


@Controller('admin')
export class AdminController {

    @Get('login')
    authAdminLogin(@Body() loginData: loginDataInterface){
        console.log(loginData)
        return true
    }

}
