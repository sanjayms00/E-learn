import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDto } from 'src/admin/dtos/adminDto';
import { Admin } from 'src/admin/schema/admin.schema';
import { LoginDto } from 'src/client/dtos/loginDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminAuthService {

    constructor(
        @InjectModel(Admin.name) private adminModel: Model<Admin>,
        private jwtService: JwtService
    ) { }

    async registerAdmin(data: AdminDto): Promise<object> {

        const adminExist = await this.adminModel.findOne({ email: data.email })

        if (adminExist) throw new ConflictException("admin already exist");

        const hashedPassword = await bcrypt.hash(data.password, 10);

        await this.adminModel.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            status: true
        })

        return {
            status: "success",
            message: "admin created successfully"
        }
    }

    async login(data: LoginDto) {

        const admin = await this.adminModel.findOne({ email: data.email });

        if (!admin) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const isPasswordMatched = await bcrypt.compare(data.password, admin.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const access_token = this.jwtService.sign({ id: admin._id }, { secret: process.env.JWT_SECRET_ADMIN });

        const adminObject = admin.toJSON();

        const { password, ...result } = adminObject;

        return {
            access_token,
            user: result
        };
    }
}
