import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Student } from "src/student/schemas/student.schema";


@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Student.name)
        private studentModel: Model<Student>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearertoken(),
            secretOrKey: process.env.JWT_SECRET_CLIENT
        })
    }
}