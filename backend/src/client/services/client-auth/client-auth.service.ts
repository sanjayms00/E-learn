import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from 'src/client/dtos/signDto';
import * as bcrypt from 'bcryptjs'
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'src/admin/schema/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/client/schema/client.schema';
import { LoginDto } from 'src/client/dtos/loginDto';


@Injectable()
export class ClientAuthService {

    constructor(
        @InjectModel(Admin.name) private clientModel: Model<Client>,
        private jwtService: JwtService
    ){}


    async register(registerData: SignupDto): Promise<{ access_token: string }> {
        const { fName, lName, email, password } = registerData

        const isAdminExist = await this.clientModel.findOne({ email })

        if (isAdminExist) {
            throw new ConflictException("Already registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)    //salt

        const admin = await this.clientModel.create({
            fName,
            lName,
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

    async login(logindata: LoginDto): Promise<{ access_token: string }> {
        const { email, password } = logindata

        const admin = await this.clientModel.findOne({ email })
        console.log(admin)
        if (!admin) {
            throw new UnauthorizedException("Unauthorized user")
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password)

        if (!isPasswordMatch) {
            throw new UnauthorizedException("invalid user and password")
        }

        return {
            access_token: await this.jwtService.signAsync({ id: admin._id }),
        };

    }

}
