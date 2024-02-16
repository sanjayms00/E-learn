import { Model, Types } from "mongoose";
import { ConfigService } from '@nestjs/config';
import { Student } from "../schema/student.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as crypto from 'crypto';
import { SharpService } from "nestjs-sharp";
import { SignedUrlService } from "src/common/service/signed-url.service";
import { UploadService } from "src/common/service/upload.service";

@Injectable()
export class StudentProfileService {

    private readonly s3Client = new S3Client({
        region: this.configService.getOrThrow('AWS_S3_REGION')
    });

    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        private readonly configService: ConfigService,
        private signedUrlService: SignedUrlService,
        private uploadService: UploadService
    ) { }


    async profileImage(image: string) {

        const signedProfileImage = await this.signedUrlService.generateSignedUrl(image)

        return signedProfileImage

    }

    
    async updateProfile(image: File, profileData, studentId: string) {


        const ObjStudentId = new Types.ObjectId(studentId);

        const UpdationQuery = {
            fullName: profileData.fullName,
            email: profileData.email,
            mobile: profileData.mobile
        };

        let uploadResult;

        if (image) {
            // Image upload to S3
            uploadResult = await this.uploadService.uploadImage(image);

            if (!uploadResult.imageSignedUrl || !uploadResult.imageName) {
                throw new Error('Failed to upload image to S3.');
            }

            // Add image property to UpdationQuery if image is uploaded
            UpdationQuery['image'] = uploadResult.imageName;
        }

        // Update instructor data
        const instructorData = await this.studentModel.updateOne(
            { _id: ObjStudentId },
            { $set: UpdationQuery }
        );

        if (!instructorData) {
            throw new NotFoundException('Instructor not found');
        }

        // Retrieve updated instructor data
        const updatedStudentData = await this.studentModel.findOne(
            { _id: ObjStudentId },
            { password: 0 }
        );

        let imageSignedUrl = null;

        if (image) {
            imageSignedUrl = await this.signedUrlService.generateSignedUrl(uploadResult.imageName);
        }

        return {
            studentData: updatedStudentData,
            imageSignedUrl
        };

    } catch(error) {
        throw new Error(error)
    }

}
