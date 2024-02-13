import { Model, Types } from "mongoose";
import { ConfigService } from '@nestjs/config';
import { Student } from "../schema/student.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as crypto from 'crypto';
import { SharpService } from "nestjs-sharp";
import { SignedUrlService } from "src/common/service/signed-url.service";

@Injectable()
export class StudentProfileService {

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    });

    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        private readonly configService: ConfigService,
        private signedUrlService: SignedUrlService
    ) { }


    async getProfile(studentId) {

        const objStudentId = new Types.ObjectId(studentId)

        const studentData = await this.studentModel.findOne(
            { _id: objStudentId },
            { password: 0, __v: 0 }
        )

        if (!studentData) throw new NotFoundException("Student information not found")

        return studentData
    }

    async updateProfile(image, profileData, studentId) {

        // console.log(profileData, image)

        const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

        const imageName = imageKey()

        const imageParams = {
            Bucket: this.configService.getOrThrow('BUCKET_NAME'),
            Key: imageName,
            Body: image.buffer,
            ContentType: image.mimetype
        };


        const imageResult = await this.s3Client.send(
            new PutObjectCommand(imageParams)
        )

        if (!imageResult) throw new Error("unable to upload the image")

        try {
            const objStudentId = new Types.ObjectId(studentId)

            const studentData = await this.studentModel.findOneAndUpdate(
                { _id: objStudentId },
                {
                    $set: {
                        fullName: profileData.fullName,
                        mobile: profileData.mobile,
                        email: profileData.email,
                        image: imageName,
                    }
                },
                { new: true }
            );

            const studentDataWithoutPassword = { ...studentData.toObject() };
            delete studentDataWithoutPassword.password;

            studentData.image = await this.signedUrlService.generateSignedUrl(studentData.image)

            return studentData
        } catch (error) {
            throw new Error(error)
        }
    }
}
