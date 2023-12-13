import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { Client } from 'src/client/schema/client.schema';
import { SignupDto } from 'src/client/dtos/signDto';
import { LoginDto } from 'src/client/dtos/loginDto';

@Injectable()
export class ClientAuthService {
  constructor(
    @InjectModel(Client.name)
    private userModel: Model<Client>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignupDto): Promise<{ access_token: string }> {
    const { lName, fName, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      fName,
      lName,
      email,
      password: hashedPassword,
      status: true,
      instructor: false
    });
    console.log(user._id)
    const access_token = await this.jwtService.sign({ id: user._id }, { secret: process.env.JWT_SECRET_CLIENT });
    return { access_token };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const access_token = this.jwtService.sign({ id: user._id }, {secret: process.env.JWT_SECRET_CLIENT});

    return { access_token };
  }
}