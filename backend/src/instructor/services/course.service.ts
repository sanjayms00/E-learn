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
import { types } from 'util';

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
            // console.log(otherData)
            // const coursePrice = parseFloat(otherData.coursePrice)
            // // console.log(coursePrice)
            // if (isNaN(coursePrice)) throw new Error('Price is not a valid number')

            const imageFile = files.find(item => item.mimetype.includes('image'));

            if (!imageFile) {
                throw new NotFoundException('Image file not provided');
            }
            // console.log(imageFile)

            const videoFiles = files.filter(item => item.mimetype.includes('video'))
            // console.log(videoFiles)

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

            const fields = JSON.parse(otherData.fields)

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
                        title: '' + fields[index].videoTitle,
                        description: '' + fields[index].videoDescription,
                        file: videoKey
                    });

                    if (!saveVideo) return new Error("Unable to save video");

                    const updateCourse = await this.courseModel.updateOne(
                        { _id: course._id },
                        {
                            $push: { videos: saveVideo._id }
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

    async updateCourse(files, otherData, instructorId) {
        try {
            console.log(otherData)

            const imageFile = files.find(item => item.mimetype.includes('image'));

            const videoFiles = files.filter(item => item.mimetype.includes('video'))

            let image = ''
            if (imageFile) {
                image = `${uuidv4()}-${imageFile.originalname}`;
                const imageLocalPath = `./public/thumbnails/${image}`;
                fs.writeFileSync(imageLocalPath, imageFile.buffer);
            } else {
                image = otherData.oldImage
            }

            //old image delete
            if (imageFile) {
                const oldImageLocalPath = `./public/thumbnails/${otherData.oldImage}`;
                fs.unlinkSync(oldImageLocalPath);
            }

            const categoryId = new Types.ObjectId(otherData.courseCategory);
            const courseId = new Types.ObjectId(otherData.id);
            const instructorObjectId = new Types.ObjectId(instructorId);

            const course = await this.courseModel.updateOne(
                { _id: courseId },
                {
                    $set: {
                        courseName: otherData.courseName,
                        categoryId,
                        price: otherData.coursePrice,
                        instructorId: instructorObjectId,
                        description: otherData.courseDescription,
                        thumbnail: image,
                        courseTags: otherData.courseTags,
                        courseLevel: otherData.courseLevel
                    }
                }
            );

            if (!course) throw new Error("Unable to create the course")

            const fields = JSON.parse(otherData.fields)
            const oldVideoData = JSON.parse(otherData.oldVideoData)

            let i = 0;

            const Data = await Promise.all(
                fields.map(async (item, index) => {
                    if (item.files !== null) {
                        console.log(item.videoTitle, item.videoDescription)
                        // console.log(videoFiles[i])
                        if (videoFiles[i]) {
                            console.log("in")
                            const videoKey = `${uuidv4()}-${videoFiles[i].originalname}`;

                            const videoParams = {
                                Bucket: 'elearn-app-assets',
                                Key: videoKey,
                                Body: videoFiles[i].buffer
                            };

                            const videoResult = await this.s3.upload(videoParams).promise();

                            const videoId = new Types.ObjectId(oldVideoData[index]._id)

                            const saveVideo = await this.videoModel.findByIdAndUpdate(
                                videoId,
                                {
                                    $set: {
                                        instructorId: instructorObjectId,
                                        title: '' + fields[i].videoTitle,
                                        description: '' + fields[i].videoDescription,
                                        file: videoKey
                                    }
                                },
                                {
                                    upsert: true,
                                    new: true,
                                    lean: true
                                }
                            );

                            if (!saveVideo) {
                                throw new Error("Unable to save video");
                            }

                            const updateCourse = await this.courseModel.updateOne(
                                { _id: courseId },
                                {
                                    $push: { videos: saveVideo._id }
                                }
                            );

                            if (!updateCourse) throw new Error("Video save to course failed")
                            return videoResult.Location;
                        }
                        i++
                    }
                }))

            // const uploadedVideos = await Promise.all(
            //     otherData.fields.map(async (videoFile, index) => {
            //         console.log("out")
            //         console.log(otherData.fields[index].file !== null)

            //         // if (videoFile.files) {
            //         //     console.log("in")
            //         //     const videoKey = `${uuidv4()}-${videoFile.originalname}`;

            //         //     const videoParams = {
            //         //         Bucket: 'elearn-app-assets',
            //         //         Key: videoKey,
            //         //         Body: videoFile.buffer
            //         //     };

            //         //     const videoResult = await this.s3.upload(videoParams).promise();

            //         //     const saveVideo = await this.videoModel.create({
            //         //         instructorId: instructorObjectId,
            //         //         title: '' + fields[index].videoTitle,
            //         //         description: '' + fields[index].videoDescription,
            //         //         file: videoResult.Location
            //         //     });

            //         //     if (!saveVideo) return new Error("Unable to save video");

            //         //     const updateCourse = await this.courseModel.updateOne(
            //         //         { _id: courseId },
            //         //         {
            //         //             $push: { videos: saveVideo._id }
            //         //         }
            //         //     );
            //         //     if (!updateCourse) throw new Error("Video save to course failed")
            //         //     return videoResult.Location;
            //         // }
            //     })
            // );

            if (!Data) return new Error("upload failed")

            return { status: "success", message: "Course created successfully" };
        } catch (error) {
            console.log(error.message);
            throw error;
        }
    }


    deleteS3Object(object: string) {
        const params = { Bucket: 'elearn-app-assets', Key: object };

        this.s3.deleteObject(params, function (err, data) {
            if (err) console.log(err, err.stack);  // error
            else console.log();                 // deleted
        });
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
        const course = this.courseModel.aggregate([
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

    deleteCourse(id: string) {
        const courseId = new Types.ObjectId(id)
        const course = this.courseModel.deleteOne({ _id: courseId })
        // console.log(course)

        return course
    }



}
