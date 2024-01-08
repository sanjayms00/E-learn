import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Video } from 'src/instructor/schema/video.schema';

@Injectable()
export class CourseService {

    private s3 = new S3();

    constructor(
        @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
        private configService: ConfigService,
        @InjectModel(Course.name) private courseModel: Model<Course>,
        @InjectModel(Video.name) private videoModel: Model<Video>
    ) { }

    // async uploadCourse(
    //     files: { imageFile: Express.Multer.File[], videoFile: Express.Multer.File[] },
    //     otherData,
    //     instructorId
    // ) {
    //     try {
    //         const imageFile = files.imageFile[0];
    //         const videoFile = files.videoFile[0];

    //         const image = `${uuidv4()}-${imageFile.originalname}`
    //         const imageLocalPath = `./public/thumbnails/${image}`

    //         fs.writeFileSync(imageLocalPath, imageFile.buffer)

    //         const videoParams = {
    //             Bucket: 'elearn-app-assets',
    //             Key: `${uuidv4()}-${videoFile.originalname}`,
    //             Body: videoFile.buffer
    //         };

    //         const videoResult = await this.s3.upload(videoParams).promise()

    //         // const [imageResult, videoResult] = await Promise.all([
    //         //     this.s3.upload(imageParams).promise(),

    //         //   ]);

    //         const categoryId = new Types.ObjectId(otherData.category)
    //         const instructorObjectId = new Types.ObjectId(instructorId)
    //         // const slug = 

    //         this.courseModel.create({
    //             courseName: otherData.courseName,
    //             // slug: 
    //             categoryId,
    //             price: otherData.price,
    //             instructorId: instructorObjectId,
    //             estimatedPrice: otherData.estimatedPrice,
    //             description: otherData.description,
    //             thumbnail: image,
    //             video: videoResult.Location,
    //         });

    //         // return videoParams.Key
    //         return { status: "success" }

    //     } catch (error) {
    //         console.log(error.messasge)
    //         throw (error)
    //     }

    // }



    //upload service

    async uploadCourse(files, otherData, instructorId) {
        try {
            console.log(otherData)
            const imageFile = files.find(item => item.mimetype.includes('image'));

            if (!imageFile) {
                throw new NotFoundException('Image file not provided');
            }
            console.log(imageFile)

            const videoFiles = files.filter(item => item.mimetype.includes('video'))
            console.log(videoFiles)

            // const imageFile = files.imageFile[0];
            // const videoFiles = files.videoFiles;


            const image = `${uuidv4()}-${imageFile.originalname}`;
            const imageLocalPath = `./public/thumbnails/${image}`;

            fs.writeFileSync(imageLocalPath, imageFile.buffer);

            const categoryId = new Types.ObjectId(otherData.courseCategory);
            const instructorObjectId = new Types.ObjectId(instructorId);

            const course = await this.courseModel.create({
                courseName: otherData.courseName,
                categoryId,
                price: otherData.coursePrice,
                instructorId: instructorObjectId,
                // estimatedPrice: otherData.estimatedPrice,
                description: otherData.courseDescription,
                thumbnail: image,
                courseTags: otherData.courseTags,
                courseLevel: otherData.courseLevel
            });

            if (!course) throw new Error("Unable to create the course")


            console.log(course)

            const uploadedVideos = await Promise.all(
                videoFiles.map(async (videoFile, index) => {
                    const videoKey = `${uuidv4()}-${videoFile.originalname}`;

                    const videoParams = {
                        Bucket: 'elearn-app-assets',
                        Key: videoKey,
                        Body: videoFile.buffer
                    };

                    const videoResult = await this.s3.upload(videoParams).promise();

                    const saveVideo = await this.videoModel.create({
                        instructorId: instructorObjectId,
                        title: otherData.fields[index].videoTitle,
                        description: otherData.fields[index].videoDescription,
                        file: videoResult.Location
                    });

                    if (!saveVideo) return new Error("Unable to save video");
                    const updateCourse = await this.courseModel.updateOne(
                        { _id: course._id },
                        {
                            $push: { video: saveVideo._id }
                        }
                    );
                    if (!updateCourse) throw new Error("Video save to course failed")
                    return videoResult.Location;
                })
            );

            if (!uploadedVideos) return new Error("upload failed")

            return { status: "success", message: "Course created successfully" };
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    async updateCourse(
        // files: { imageFile: Express.Multer.File[], videoFile: Express.Multer.File[] },
        otherData
    ) {
        try {
            // const imageFile = files.imageFile[0];
            // const videoFile = files.videoFile[0];

            // const image = `${uuidv4()}-${imageFile.originalname}`
            // const imageLocalPath = `./public/thumbnails/${image}`

            // fs.writeFileSync(imageLocalPath, imageFile.buffer)

            // const videoParams = {
            //     Bucket: 'elearn-app-assets',
            //     Key: `${uuidv4()}-${videoFile.originalname}`,
            //     Body: videoFile.buffer
            // };

            // const videoResult = await this.s3.upload(videoParams).promise()
            const categoryId = new Types.ObjectId(otherData.category)
            const courseObjectId = new Types.ObjectId(otherData.courseId)
            // const slug = 

            const result = await this.courseModel.updateOne(
                { _id: courseObjectId },
                {
                    $set: {
                        courseName: otherData.courseName,
                        // slug: 
                        categoryId,
                        price: otherData.price,
                        estimatedPrice: otherData.estimatedPrice,
                        description: otherData.description,
                        // thumbnail: image,
                        // video: videoResult.Location,
                    }
                }
            );

            console.log(result)

            // return videoParams.Key
            return { status: "success" }

        } catch (error) {
            console.log(error.messasge)
            throw (error)
        }

    }




    getInstructorCourse(id: string) {
        const instructorId = new Types.ObjectId(id)
        return this.courseModel.find({ instructorId }, { video: 0 })
    }


    getFile(key) {
        const params = {
            Bucket: 'elearn-app-assets',
            Key: key,
        };
        return this.s3.getObject(params).createReadStream();
    }


    async listFilesInBucket() {
        try {
            const bucketName = "elearn-app-assets"
            const data = await this.s3.listObjectsV2({ Bucket: bucketName }).promise();
            return data.Contents; // Array of file objects
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }

    editCourse(id: string) {
        const courseId = new Types.ObjectId(id)
        const course = this.courseModel.findOne({ _id: courseId })
        console.log(course)

        return course
    }

    deleteCourse(id: string) {
        const courseId = new Types.ObjectId(id)
        const course = this.courseModel.deleteOne({ _id: courseId })
        console.log(course)

        return course
    }



}
