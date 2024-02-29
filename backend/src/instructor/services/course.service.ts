import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import * as crypto from 'crypto';
import { SharpService } from 'nestjs-sharp';
import { SignedUrlService } from 'src/common/service/signed-url.service';

@Injectable()
export class CourseService {

    private s3Client: any

    constructor(
        @InjectModel(Instructor.name) private instructorModel: Model<Instructor>,
        private readonly configService: ConfigService,
        @InjectModel(Course.name) private courseModel: Model<Course>,
        @InjectModel(Video.name) private videoModel: Model<Video>,
        private sharpService: SharpService,
        private signedUrlService: SignedUrlService
    ) {
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow("AWS_S3_REGION")
        });
    }

    async compressImage(inputBuffer: Buffer): Promise<Buffer> {
        return await this.sharpService
            .edit(inputBuffer)
            .jpeg({ quality: 80 })
            .toBuffer();
    }


    // async compressVideo(inputBuffer: Buffer): Promise<Buffer> {
    //     return new Promise((resolve, reject) => {
    //       const inputStream = Readable.from(inputBuffer);

    //       const outputStream = ffmpeg()
    //         .input(inputStream)
    //         .videoCodec('libx264')
    //         .audioCodec('aac')
    //         .outputOptions('-movflags frag_keyframe+empty_moov')
    //         .on('end', () => resolve(outputStream.toBuffer()))
    //         .on('error', (err) => reject(err))
    //         .toFormat('mp4')
    //         .pipe();
    //     });
    //   }


    //upload the course

    async uploadCourse(files, trailer, otherData, instructorId) {
        try {
            const imageFile = files.find(item => item.mimetype.includes('image'));

            if (!imageFile) {
                throw new NotFoundException('Image file not provided');
            }

            const videoFiles = files.filter(item => item.mimetype.includes('video'))

            const trailerFile = trailer.find(item => item.mimetype.includes('video'))

            const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

            const imageName = imageKey()

            const imageBuffer = await this.compressImage(imageFile.buffer)

            const imageParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: imageName,
                Body: imageBuffer,
                ContentType: imageFile.mimetype
            };

            const imageResult = await this.s3Client.send(
                new PutObjectCommand(imageParams)
            )

            if (!imageResult) throw new Error("unable to upload the image")

            const trailerKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

            const trailerName = trailerKey()

            // const compressedVideoBuffer = await this.compressVideo(trailer.buffer);

            const trailerParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: trailerName,
                Body: trailerFile.buffer,
                ContentType: trailerFile.mimetype
            };

            const trailerResult = await this.s3Client.send(
                new PutObjectCommand(trailerParams)
            )

            if (!trailerResult) throw new Error("unable to upload the image")

            // to object id
            const categoryId = new Types.ObjectId(otherData.courseCategory);
            const instructorObjectId = new Types.ObjectId(instructorId);

            //create course
            const course = await this.courseModel.create({
                courseName: otherData.courseName,
                categoryId,
                price: JSON.parse(otherData.coursePrice),
                instructorId: instructorObjectId,
                description: otherData.courseDescription,
                thumbnail: imageName,
                trailer: trailerName,
                content: otherData.content,
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

                    // const compressedVideoBuffer = await this.compressVideo(videoFile.buffer)

                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: videoName,
                        Body: videoFile.buffer,
                        ContentType: videoFile.mimetype
                    };

                    const videoResult = await this.s3Client.send(
                        new PutObjectCommand(videoParams)
                    )

                    if (!videoResult) throw new Error("unable to upload the video")

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

            throw error;
        }
    }



    //update course informations
    async updateCourseInformation(files, trailer, otherData, instructorId) {
        try {

            const key = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

            let newImageFileName = key()

            let newTrailerFileName = key()

            if (files) {

                const imageFile = files.find(item => item.mimetype.includes('image'));

                if (imageFile) {

                    //delete the old file
                    const deleteImageParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: otherData.oldImage,
                    };
                    const deleteImageCommand = new DeleteObjectCommand(deleteImageParams);
                    await this.s3Client.send(deleteImageCommand);

                    const imageBuffer = await this.compressImage(imageFile.buffer)

                    //insert new file
                    const imageParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newImageFileName,
                        Body: imageBuffer,
                        ContentType: imageFile.mimetype
                    };
                    const command = new PutObjectCommand(imageParams);
                    await this.s3Client.send(command)
                } else {
                    newImageFileName = otherData.oldImage
                }
            } else {
                newImageFileName = otherData.oldImage
            }

            if (trailer) {

                const trailerFile = trailer.find(item => item.mimetype.includes('video'));



                if (trailerFile) {
                    //delete old trailer
                    const deleteTrailerParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: otherData.oldTrailer,
                    };
                    const deleteTrailerCommand = new DeleteObjectCommand(deleteTrailerParams);
                    await this.s3Client.send(deleteTrailerCommand);

                    //insert new trailer
                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newTrailerFileName,
                        Body: trailerFile.buffer,
                        ContentType: trailerFile.mimetype
                    };
                    const command = new PutObjectCommand(videoParams);
                    await this.s3Client.send(command)
                } else {
                    newTrailerFileName = otherData.oldTrailer
                }

            } else {
                newTrailerFileName = otherData.oldTrailer
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
                        price: JSON.parse(otherData.coursePrice),
                        description: otherData.courseDescription,
                        content: otherData.content,
                        thumbnail: newImageFileName,
                        trailer: newTrailerFileName,
                        courseTags: otherData.courseTags,
                        courseLevel: JSON.parse(otherData.courseLevel)
                    }
                }
            );

            if (!course) throw new Error("Unable to Update the course information")

            return { status: "success", message: "Course Updated successfully" };
        } catch (error) {
            throw error;
        }
    }



    //update a single chapter
    async updateSingleChapter(files, id, formData) {
        try {
            const { videoId, oldVideo, title, description, courseId } = formData

            const ObjVideoId = new Types.ObjectId(videoId)

            const key = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

            let newVidoeFileName = key()

            if (files.length > 0) {
                const videoFile = files.find(item => item.mimetype.includes('video'));
                if (videoFile) {
                    //delete old trailer
                    const deleteVideoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: oldVideo,
                    };
                    const deleteTrailerCommand = new DeleteObjectCommand(deleteVideoParams);
                    await this.s3Client.send(deleteTrailerCommand);

                    //insert new trailer
                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newVidoeFileName,
                        Body: videoFile.buffer,
                        ContentType: videoFile.mimetype
                    };
                    const command = new PutObjectCommand(videoParams);
                    await this.s3Client.send(command)
                } else {
                    newVidoeFileName = oldVideo
                }

            } else {
                newVidoeFileName = oldVideo
            }


            if (videoId) {
                await this.videoModel.updateOne(
                    { _id: new Types.ObjectId(videoId) },
                    {
                        $set: {
                            title,
                            description,
                            file: newVidoeFileName
                        }
                    }
                )
            }

            const instructorCourseContentData = await this.editCourseContent(courseId)

            if (!instructorCourseContentData) throw new Error('unable to get the updated course Data')

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
                        ContentType: videoFile.mimetype
                    };

                    const command = new PutObjectCommand(videoParams);
                    await this.s3Client.send(command)

                    const saveVideo = await this.videoModel.create({
                        instructorId: instructorObjectId,
                        index: index,
                        title: fields[index].videoTitle,
                        description: fields[index].videoDescription,
                        file: videoName,
                        courseId: courseId
                    });

                    if (!saveVideo) return new Error("Unable to save video");

                    const updateCourse = await this.courseModel.updateOne(
                        { _id: courseId },
                        {
                            $push: { videos: saveVideo._id }
                        }
                    );

                    if (!updateCourse) throw new Error("Video saving to course failed")

                    return true
                })
            );

            if (!uploadedVideos) return new Error("upload failed")

            const instructorCourseContentData = await this.editCourseContent(otherData.courseId)

            if (!instructorCourseContentData) throw new Error('unable to get the updated course Data')

            return instructorCourseContentData

        } catch (error) {
            throw new Error(error)
        }
    }



    //get instructor courses
    async getInstructorCourse(instructorId: string) {
        try {
            const objInstructorId = new Types.ObjectId(instructorId)
            const courses = await this.courseModel.find({ instructorId: objInstructorId }, { video: 0 })

            const courseWithPreSignedUrls = await Promise.all(courses.map(async (item) => {
                item.thumbnail = await this.signedUrlService.generateSignedUrl(item.thumbnail)
                return item
            }));

            return courseWithPreSignedUrls
        } catch (error) {
            throw new Error(error);
        }

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
                        content: { $first: '$content' },
                        thumbnail: { $first: '$thumbnail' },
                        trailer: { $first: '$trailer' },
                        instructorId: { $first: '$instructorId' },
                        courseTags: { $first: '$courseTags' },
                        courseLevel: { $first: '$courseLevel' },
                        videos: { $push: '$videoData' },
                    }
                }
            ])

            if (course.length < 1) throw new NotFoundException("Course not found");

            const courseWithPreSignedUrls = await Promise.all(course.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail)
                return item
            }));

            return courseWithPreSignedUrls[0]

        } catch (error) {
            throw new Error(error)
        }

    }


    //edit the course content
    async editCourseContent(id: string) {
        try {
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
                        videos: '$videos'
                    }
                }
            ])

            if (course.length < 1) throw new NotFoundException("No data found")
            return course

        } catch (error) {

            throw new Error(error)
        }

    }



    //delete a course
    async deleteCourse(courseId: string, instructorId: string) {
        const objCourseId = new Types.ObjectId(courseId)

        //find course
        const course = await this.courseModel.findOne({ _id: objCourseId })

        if (!course) throw new NotFoundException("Course not found")

        //check students are enrolled
        if (course.students.length > 0) throw new NotFoundException("Students are enrolled unable to delete")

        //delete thumbnail
        const imageParams = {
            Bucket: this.configService.getOrThrow('BUCKET_NAME'),
            Key: course.thumbnail,
        };

        const deleteImageFromS3 = await this.s3Client.send(
            new DeleteObjectCommand(imageParams)
        )

        if (!deleteImageFromS3) throw new Error("Unable to delete the thumbnail")

        //delete videos
        course.videos.forEach(async (item) => {
            const video = await this.videoModel.findOne({ _id: item })

            if (!video) throw new NotFoundException("Video not found")

            //delete video Data
            const deleteVideo = await this.videoModel.deleteOne({ _id: item })

            if (!deleteVideo) throw new Error("Unable to delete video")

            const videoParams = {
                Bucket: this.configService.getOrThrow('BUCKET_NAME'),
                Key: video.file,
            };

            const deleteVideoFromS3 = await this.s3Client.send(
                new DeleteObjectCommand(videoParams)
            )

            if (!deleteVideoFromS3) throw new Error("Unable to delete the video")
        })

        //delete course
        const deleteCourse = await this.courseModel.deleteOne({ _id: objCourseId })

        return this.getInstructorCourse(instructorId)
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

            const deleteFromS3 = await this.s3Client.send(
                new DeleteObjectCommand(videoParams)
            )

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

            return instructorCourseContentData

        } catch (error) {
            throw new Error(error)
        }
    }

}
