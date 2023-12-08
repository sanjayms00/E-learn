import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Student } from './schemas/student.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { loginDataInterface } from 'src/interfaces/common.interface';


@Injectable()
export class StudentService {
    constructor(
        @InjectModel(Student.name) 
        private studentModel: mongoose.Model<Student>,
        private jwtService: JwtService
    ){}

    async signUp(signUpData: SignupDto) : Promise<{token : string}>
    {
        const {fName, lName, email, password } = signUpData
        
        const isStudentExist = await this.studentModel.findOne({email: email})

        if(isStudentExist){
            throw new ConflictException("Already registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)    //salt
        
        const student = await this.studentModel.create({
            fName,
            lName,
            email,
            password: hashedPassword,
            instructor : false,
            status: true
        })

        return {
            token: await this.jwtService.signAsync({id: student._id})
        };
    }

    async login(loginData: loginDataInterface) : Promise<{token : string}>
    {
        const { email, password } = loginData
        
        const student = await this.studentModel.findOne({email})

        if(!student){
            throw new NotFoundException("User not found")
        } 

        const isPasswordMatch = await bcrypt.compare(password, student.password)

        if(!isPasswordMatch){
            throw new UnauthorizedException("unauthorized user")
        }

        return {
            token: await this.jwtService.signAsync({id: student._id}),
        };
          
    }
 
    async getIntructors(): Promise<Student[]>
    {
        return await this.studentModel.find({instructor : true}, {password: 0, __v:0})
    }

    async getStudents(): Promise<Student[]>
    {
        return await this.studentModel.find({instructor : false}, {password: 0, __v:0})
    }

    // async createStudent(data: Student): Promise<Student>
    // {
    //     const isValid = await this.studentModel.find({email : data.email})
    //     if(isValid){
    //         throw new ConflictException("Already registed")
    //     }
        
    //     return await this.studentModel.create(data)
    // }

    // async findById(id : string): Promise<Student>
    // {
    //     const student =  await this.studentModel.findById(id)

    //     if(!student){
    //         throw new NotFoundException("student not found")
    //     }

    //     return student
    // }

    // async updateById(id : string, data : Student): Promise<Student>
    // {
    //     const student =  await this.studentModel.findByIdAndUpdate(id, data)

    //     if(!student){
    //         throw new NotFoundException("student not found")
    //     }

    //     return student
    // }

}
