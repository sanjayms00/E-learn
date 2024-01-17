import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../schema/student.schema';
import { Types } from 'mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { videoType } from 'src/common/types/type';


@Injectable()
export class LearningService {

    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Video.name) private videoModel: Model<Video>,
    ) { }

    client: any = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_S3_REGION
    });


    //get student course
    async getMyCourses(id: string) {

        const objId = new Types.ObjectId(id)
        console.log(objId)
        const courses = await this.studentModel.aggregate([
            {
                $match: {
                    _id: objId
                }
            },
            {
                $unwind: '$courses'
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'courses.courseId',
                    foreignField: '_id',
                    as: 'myCourses'
                }
            },
            {
                $project: {
                    courses: 1,
                    myCourses: 1
                }
            }
        ])
        // console.log(JSON.stringify(courses))
        return courses

    }

    async getVideo(id: string) {
        const ObjId = new Types.ObjectId(id);

        const videoResult: videoType = await this.videoModel.findOne({ _id: ObjId })

        if (!videoResult) throw new NotFoundException();

        //get the signed url for video

        const newVideoResult = await this.getSignedVideo(videoResult)
        return newVideoResult;
    }

    //signed video url generate
    async getSignedVideo(videoData) {

        const getImageObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: videoData.file
        };

        const command: any = new GetObjectCommand(getImageObjectParams);

        const signedUrl = await getSignedUrl(this.client, command, { expiresIn: 60 * 60 });   //for 1 hour

        const cleanVideoData = videoData.toObject();

        return {
            ...cleanVideoData,
            videoUrl: signedUrl
        }
    }



}
