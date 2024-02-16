import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor } from '../schema/instructor.schema';
import { Model, Types } from 'mongoose';
import { UploadService } from 'src/common/service/upload.service';
import { SignedUrlService } from 'src/common/service/signed-url.service';


@Injectable()
export class InstructorProfileService {



    constructor(
        @InjectModel(Instructor.name)
        private instructorModel: Model<Instructor>,
        private uploadService: UploadService,
        private signedUrlService: SignedUrlService
    ) { }

    async profileUpdate(instructorId: string, formData: any, image: File) {

        const ObjInstructorId = new Types.ObjectId(instructorId);
        const UpdationQuery = {
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            headline: formData.headline,
            biography: formData.biography,
            twitter: formData.twitter,
            facebook: formData.facebook,
            instagram: formData.instagram,
            linkedin: formData.linkedin,
            website: formData.website
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
        const instructorData = await this.instructorModel.updateOne(
            { _id: ObjInstructorId },
            { $set: UpdationQuery }
        );

        if (!instructorData) {
            throw new NotFoundException('Instructor not found');
        }

        // Retrieve updated instructor data
        const updatedInstructorData = await this.instructorModel.findOne(
            { _id: ObjInstructorId },
            { password: 0 }
        );

        let imageSignedUrl = null;

        if (image) {
            imageSignedUrl = await this.signedUrlService.generateSignedUrl(uploadResult.imageName);
        }

        return {
            instructorData: updatedInstructorData,
            imageSignedUrl
        };
    }




    async profileImage(image: string) {

        const signedProfileImage = await this.signedUrlService.generateSignedUrl(image)

        return signedProfileImage

    }





}
