import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Client } from 'src/client/schema/client.schema';
import { SignupDto } from 'src/client/dtos/signDto';
import { LoginDto } from 'src/client/dtos/loginDto';
import { userAuthReturn } from 'src/types/type';

@Injectable()
export class ClientAuthService {
  constructor(
    @InjectModel(Client.name)
    private userModel: Model<Client>,
    private jwtService: JwtService,
  ) {}

  //signup student
  async signUp(signUpData: SignupDto): Promise<userAuthReturn> {
    const { lName, fName, email } = signUpData;

    const client = await this.userModel.findOne({ email: signUpData.email });

    if (client) {
      throw new ConflictException('User already exist');
    }

    const hashedPassword = await bcrypt.hash(signUpData.password, 10);

    const user = await this.userModel.create({
      fName,
      lName,
      email,
      password: hashedPassword,
      status: true,
      instructor: false
    });

    const access_token = await this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_CLIENT });
    
    const clientObject = user.toJSON();

    const { password, __v, ...result } = clientObject;
    
    return { 
      access_token, 
      user : result
    };
  }

  //login student ot instructor
  async login(loginData: LoginDto): Promise<userAuthReturn> {

    const client = await this.userModel.findOne({ email: loginData.email });

    if (!client) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(loginData.password, client.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: client._id }, {secret: process.env.JWT_SECRET_CLIENT});
    
    const clientObject = client.toJSON();

    const { password, __v, ...result } = clientObject;
    
    return { 
      access_token, 
      user : result
    };
  }
}