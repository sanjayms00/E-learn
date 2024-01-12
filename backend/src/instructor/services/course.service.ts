import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import * as crypto from 'crypto';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


@Injectable()
export class CourseService {

    // private s3 = new S3();
    // private s3 = new S3Client({
    //     credentials: {
    //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //     },
    //     region: process.env.AWS_S3_REGION
    // });

    private client: any = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_S3_REGION
    });

    constructor(
        @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
        private configService: ConfigService,
        @InjectModel(Course.name) private courseModel: Model<Course>,
        @InjectModel(Video.name) private videoModel: Model<Video>
    ) { }

    //upload the course
    async uploadCourse(files, otherData, instructorId) {
        try {
            const imageFile = files.find(item => item.mimetype.includes('image'));

            if (!imageFile) {
                throw new NotFoundException('Image file not provided');
            }

            const videoFiles = files.filter(item => item.mimetype.includes('video'))

            const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

            const imageName = imageKey()

            const imageParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: imageName,
                Body: imageFile.buffer,
                contentType: imageFile.mimetype
            };

            const command = new PutObjectCommand(imageParams);
            const imageResult = await this.client.send(command)

            if (!imageResult) throw new Error("unable to upload the image")

            // to object id
            const categoryId = new Types.ObjectId(otherData.courseCategory);
            const instructorObjectId = new Types.ObjectId(instructorId);

            //create course
            const course = await this.courseModel.create({
                courseName: otherData.courseName,
                categoryId,
                price: otherData.coursePrice,
                instructorId: instructorObjectId,
                description: otherData.courseDescription,
                thumbnail: imageName,
                courseTags: otherData.courseTags,
                courseLevel: JSON.parse(otherData.courseLevel)
            });

            if (!course) throw new Error("Unable to create the course")

            //parse fields data 
            const fields = JSON.parse(otherData.fields)

            //upload videos
            const uploadedVideos = await Promise.all(
                videoFiles.map(async (videoFile, index) => {
                    const videoKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

                    const videoName = videoKey()

                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: videoName,
                        Body: videoFile.buffer,
                        contentType: videoFile.mimetype
                    };

                    const command = new PutObjectCommand(videoParams);
                    await this.client.send(command)

                    const saveVideo = await this.videoModel.create({
                        instructorId: instructorObjectId,
                        index: index,
                        title: fields[index].videoTitle,
                        description: fields[index].videoDescription,
                        file: videoName
                    });

                    if (!saveVideo) return new Error("Unable to save video");

                    const updateCourse = await this.courseModel.updateOne(
                        { _id: course._id },
                        {
                            $push: { videos: saveVideo._id }
                        }
                    );

                    if (!updateCourse) throw new Error("Video saving to course failed")

                    return true
                })
            );

            if (!uploadedVideos) return new Error("upload failed")

            return { status: "success", message: "Course created successfully" };
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    //update course informations
    async updateCourseInformation(files, otherData, instructorId) {
        try {

            const imageFile = files.find(item => item.mimetype.includes('image'));

            //new image replace old image
            if (imageFile) {
                const imageParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: otherData.oldImage,
                    Body: imageFile.buffer,
                    contentType: imageFile.mimetype
                };
                const command = new PutObjectCommand(imageParams);
                await this.client.send(command)
            }

            const categoryId = new Types.ObjectId(otherData.courseCategory);
            const courseId = new Types.ObjectId(otherData.id);

            //update the information
            const course = await this.courseModel.updateOne(
                { _id: courseId },
                {
                    $set: {
                        courseName: otherData.courseName,
                        categoryId,
                        price: otherData.coursePrice,
                        description: otherData.courseDescription,
                        thumbnail: otherData.oldImage,
                        courseTags: otherData.courseTags,
                        courseLevel: JSON.parse(otherData.courseLevel)
                    }
                }
            );

            if (!course) throw new Error("Unable to Update the course information")

            return { status: "success", message: "Course Updated successfully" };
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    //update courseContent
    async updateCourseContent(files, otherData, instructorId) {
        try {
            // console.log("otherData", otherData)
            const videoFiles = files.filter(item => item.mimetype.includes('video'))
            // console.log(videoFiles)
            const courseId = new Types.ObjectId(otherData.id);
            const instructorObjectId = new Types.ObjectId(instructorId);

            const fields = JSON.parse(otherData.fields)
            const oldVideoData = JSON.parse(otherData.oldVideoData)

            let i = 0;

            const Data = await Promise.all(
                fields.map(async (item, index) => {
                    console.log(index)
                    console.log(oldVideoData[index]?.file)
                    if (item.files !== null) {
                        console.log(item.videoTitle, item.videoDescription)
                        console.log(videoFiles[i])

                        // if (otherData.oldVideo[index].file && )



                        //     if (videoFiles[i]) {

                        //         const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

                        //         const imageName = imageKey()

                        //         const imageParams = {
                        //             Bucket: process.env.BUCKET_NAME,
                        //             Key: otherData.oldImage,
                        //             Body: imageFile.buffer,
                        //             contentType: imageFile.mimetype
                        //         };
                        //         const command = new PutObjectCommand(imageParams);
                        //         await this.s3.send(command)

                        //         const videoId = new Types.ObjectId(oldVideoData[index]._id)

                        //         const saveVideo = await this.videoModel.findByIdAndUpdate(
                        //             videoId,
                        //             {
                        //                 $set: {
                        //                     instructorId: instructorObjectId,
                        //                     title: '' + fields[i].videoTitle,
                        //                     description: '' + fields[i].videoDescription,
                        //                     file: videoKey
                        //                 }
                        //             },
                        //             {
                        //                 upsert: true,
                        //                 new: true,
                        //                 lean: true
                        //             }
                        //         );

                        //         if (!saveVideo) {
                        //             throw new Error("Unable to save video");
                        //         }

                        //         const updateCourse = await this.courseModel.updateOne(
                        //             { _id: courseId },
                        //             {
                        //                 $push: { videos: saveVideo._id }
                        //             }
                        //         );

                        //         if (!updateCourse) throw new Error("Video save to course failed")
                        //         return videoResult.Location;
                        //     }
                        i++
                    }
                }))

            if (!Data) return new Error("upload failed")

            return { status: "success", message: "Course Updated successfully" };
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }

    //get instructor courses
    async getInstructorCourse(id: string) {
        const instructorId = new Types.ObjectId(id)
        const courses = await this.courseModel.find({ instructorId }, { video: 0 })

        const signedCourses = await this.generateSignedUrl(courses)

        return signedCourses
    }

    async generateSignedUrl(courses) {
        const signedCourses = await Promise.all(
            courses.map(async (course) => {
                const getImageObjectParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: course.thumbnail,
                };

                const command: any = new GetObjectCommand(getImageObjectParams);

                const signedUrl = await getSignedUrl(this.client, command, { expiresIn: 60 * 60 });

                console.log(course);
                console.log(signedUrl);

                return { ...course.toObject(), thumbnailUrl: signedUrl };
            })
        );

        return signedCourses;
    }


    //edit course details
    async editCourse(id: string) {
        const courseId = new Types.ObjectId(id)
        try {
            const course = await this.courseModel.aggregate([
                {
                    $match: {
                        _id: courseId
                    }
                },
                {
                    $unwind: '$videos'
                },
                {
                    $lookup: {
                        from: 'videos',
                        localField: "videos",
                        foreignField: "_id",
                        as: "videoData"
                    }
                },
                {
                    $unwind: '$videoData',
                },
                {
                    $group: {
                        _id: '$_id',
                        courseName: { $first: '$courseName' },
                        description: { $first: '$description' },
                        price: { $first: '$price' },
                        categoryId: { $first: '$categoryId' },
                        thumbnail: { $first: '$thumbnail' },
                        instructorId: { $first: '$instructorId' },
                        courseTags: { $first: '$courseTags' },
                        courseLevel: { $first: '$courseLevel' },
                        videos: { $push: '$videoData' },
                    }
                }
            ])
            // console.log(course)
            return course
        } catch (error) {
            console.log(error.message)
            throw new Error(error.message)
        }

    }

    //edit the course content
    async editCourseContent(id: string) {
        const courseId = new Types.ObjectId(id)
        const course = await this.courseModel.aggregate([
            {
                $match: {
                    _id: courseId
                }
            },
            {
                $unwind: '$videos'
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: "videos",
                    foreignField: "_id",
                    as: "videoData"
                }
            },
            {
                $unwind: '$videoData',
            },
            {
                $group: {
                    _id: '$_id',
                    courseName: { $first: '$courseName' },
                    description: { $first: '$description' },
                    price: { $first: '$price' },
                    categoryId: { $first: '$categoryId' },
                    thumbnail: { $first: '$thumbnail' },
                    instructorId: { $first: '$instructorId' },
                    courseTags: { $first: '$courseTags' },
                    courseLevel: { $first: '$courseLevel' },
                    videos: { $push: '$videoData' },
                }
            }
        ])
        // console.log(course)
        return course
    }

    //delete a course
    async deleteCourse(id: string) {
        const courseId = new Types.ObjectId(id)
        const course = await this.courseModel.deleteOne({ _id: courseId })
        // console.log(course)

        return course
    }



}
