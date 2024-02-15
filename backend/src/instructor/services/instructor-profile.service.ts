import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instructor } from '../schema/instructor.schema';
import { Model, Types } from 'mongoose';
import { UploadService } from 'src/common/service/upload.service';


@Injectable()
export class InstructorProfileService {



    constructor(
        @InjectModel(Instructor.name)
        private instructorModel: Model<Instructor>,
        private uploadService: UploadService
    ) { }

    async profileUpdate(instructorId: string, formData, image: File) {

        console.log(formData, instructorId, image)

        const ObjInstructorId = new Types.ObjectId(instructorId)

        //image upload to s3
        const uploadResult = await this.uploadService.uploadImage(image)

        if (!uploadResult.imageSignedUrl || !uploadResult.imageName) {
            throw new Error('Failed to upload image to S3.');
        }

        let instructorData = await this.instructorModel.updateOne(
            { _id: ObjInstructorId },
            {
                $set: {
                    fullName: formData.fullName,
                    email: formData.email,
                    mobile: formData.mobile,
                    password: formData.password,
                    status: formData.status,
                    headline: formData.headline,
                    biography: formData.biography,
                    twitter: formData.twitter,
                    facebook: formData.facebook,
                    instagram: formData.instagram,
                    linkedin: formData.linkedin,
                    website: formData.website,
                    image: uploadResult.imageName
                }
            }
        )

        if (!instructorData) throw new NotFoundException('instructor not found')


        //upload the image

        instructorData = await this.instructorModel.findOne(
            { _id: ObjInstructorId },
            { password: 0 }
        )


        // instructorData.image = imageSignedUrl;

        return instructorData
    }



}
