import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../schema/student.schema';
import { Types } from 'mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Course } from 'src/instructor/schema/course.schema';


@Injectable()
export class LearningService {

    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Video.name) private videoModel: Model<Video>,
        @InjectModel(Course.name) private courseModel: Model<Course>,
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

    //get course data and video for streaming
    async streamCourseData(courseId: string, videoId: string, studentId: string) {
        try {
            const objCourseId = new Types.ObjectId(courseId);
            const objStudentId = new Types.ObjectId(studentId);
            const objVideoId = new Types.ObjectId(videoId);

            //find course present in student
            const checkCourseValid = await this.studentModel.findOne(
                { _id: objStudentId, "courses.courseId": objCourseId },
                { password: 0 }
            )

            if (!checkCourseValid) throw new UnauthorizedException("Not allowed")

            //get cousedata and the present video data
            const courseData = await this.courseModel.aggregate([
                {
                    $match: {
                        _id: objCourseId,
                        videos: {
                            $in: [objVideoId]
                        }
                    }
                },
                {
                    $lookup: {
                        from: "videos",
                        localField: 'videos',
                        foreignField: "_id",
                        as: "videoData"
                    }
                }
            ])

            if (!courseData) throw new NotFoundException();

            const videoFile = courseData[0].videoData.filter(item => item._id == videoId)

            //get the signed url for video
            const signedVideoUrl = await this.getSignedVideo(videoFile[0].file)

            if (!signedVideoUrl) throw new Error("Unablle to play the requested file")

            return { courseData, signedVideoUrl }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //signed video url generate
    async getSignedVideo(videofile) {

        const getImageObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: videofile
        };

        const command: any = new GetObjectCommand(getImageObjectParams);

        const signedUrl = await getSignedUrl(this.client, command, { expiresIn: 60 * 60 });   //for 1 hour

        return signedUrl
    }



}
