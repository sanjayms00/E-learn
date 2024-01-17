import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
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
                        file: videoName,
                        courseId: course._id
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


    //update a single chapter
    async updateSingleChapter(files, id, formData) {
        try {
            const { videoId, oldVideo, title, description, courseId } = formData

            if (files.length > 0) {
                //replace existing video
                const videoParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: oldVideo,
                    Body: files[0].buffer,
                    contentType: files[0].mimetype
                };

                const command = new PutObjectCommand(videoParams);
                const videoUploadResult = await this.client.send(command)

                if (!videoUploadResult) throw new Error('video upload failed')
            }

            if (videoId) {
                await this.videoModel.updateOne(
                    { _id: new Types.ObjectId(videoId) },
                    {
                        $set: {
                            title,
                            description
                        }
                    }
                )
            }

            console.log(courseId)

            const instructorCourseContentData = await this.editCourseContent(courseId)

            if (!instructorCourseContentData) throw new Error('unable to get the updated course Data')

            // console.log("Data is", instructorCourseContentData)

            return instructorCourseContentData

        } catch (error) {
            throw new Error(error.message)
        }
    }

    //update courseContent
    async updateCourseContent(files, otherData, instructorId) {
        try {
            const videoFiles = files.filter(item => item.mimetype.includes('video'))


            const instructorObjectId = new Types.ObjectId(instructorId);
            const courseId = new Types.ObjectId(otherData.courseId);

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
                        file: videoName,
                        courseId: courseId
                    });

                    console.log("here")
                    if (!saveVideo) return new Error("Unable to save video");
                    console.log(courseId)
                    const updateCourse = await this.courseModel.updateOne(
                        { _id: courseId },
                        {
                            $push: { videos: saveVideo._id }
                        }
                    );
                    console.log("here2")
                    console.log(updateCourse)
                    if (!updateCourse) throw new Error("Video saving to course failed")

                    return true
                })
            );

            if (!uploadedVideos) return new Error("upload failed")
            console.log(otherData.courseId)
            const instructorCourseContentData = await this.editCourseContent(otherData.courseId)

            if (!instructorCourseContentData) throw new Error('unable to get the updated course Data')

            console.log("Data is", instructorCourseContentData)

            return instructorCourseContentData

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

    //generate signed url for images
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
            },
            {
                $project: {
                    _id: 1,
                    courseName: 1,
                    description: 1,
                    price: 1,
                    categoryId: 1,
                    thumbnail: 1,
                    instructorId: 1,
                    courseTags: 1,
                    courseLevel: 1,
                    videos: { $reverseArray: '$videos' } // Reverse the order of videos
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

    //delete ca chapter
    async deleteChapter(videoId) {

        try {
            if (!videoId) throw new Error('Id is not present')

            const videoObjId = new Types.ObjectId(videoId)
            //find video
            const findVideo = await this.videoModel.findOne({ _id: videoObjId })

            const videoParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: findVideo.file,
            };

            const command = new DeleteObjectCommand(videoParams);

            const deleteFromS3 = await this.client.send(command)

            if (!deleteFromS3) throw new Error('Unable to delete the video')

            const courserObjId = new Types.ObjectId(findVideo.courseId)

            const deleteVideo = await this.videoModel.deleteOne({ _id: videoObjId })

            const deleteVideoFromCourse = await this.courseModel.updateOne(
                { _id: courserObjId },
                {
                    $pull: {
                        videos: videoObjId
                    }
                }
            )

            const result = Promise.all([deleteVideo, deleteVideoFromCourse])

            if (!result) throw new Error('issue deleting the video')

            const instructorCourseContentData = await this.editCourseContent(String(findVideo.courseId))

            if (!instructorCourseContentData) throw new Error('unable to get the updated course Data')

            console.log("Data is", instructorCourseContentData)

            return instructorCourseContentData

        } catch (error) {
            throw new Error(error.message)
        }
    }

}
