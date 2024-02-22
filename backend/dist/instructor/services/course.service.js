"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const instructor_schema_1 = require("../schema/instructor.schema");
const course_schema_1 = require("../schema/course.schema");
const mongoose_2 = require("@nestjs/mongoose");
const video_schema_1 = require("../schema/video.schema");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto = __importStar(require("crypto"));
const nestjs_sharp_1 = require("nestjs-sharp");
const signed_url_service_1 = require("../../common/service/signed-url.service");
let CourseService = class CourseService {
    constructor(instructorModel, configService, courseModel, videoModel, sharpService, signedUrlService) {
        this.instructorModel = instructorModel;
        this.configService = configService;
        this.courseModel = courseModel;
        this.videoModel = videoModel;
        this.sharpService = sharpService;
        this.signedUrlService = signedUrlService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.getOrThrow("AWS_S3_REGION")
        });
    }
    async compressImage(inputBuffer) {
        return await this.sharpService
            .edit(inputBuffer)
            .jpeg({ quality: 80 })
            .toBuffer();
    }
    async uploadCourse(files, trailer, otherData, instructorId) {
        try {
            const imageFile = files.find(item => item.mimetype.includes('image'));
            if (!imageFile) {
                throw new common_1.NotFoundException('Image file not provided');
            }
            const videoFiles = files.filter(item => item.mimetype.includes('video'));
            const trailerFile = trailer.find(item => item.mimetype.includes('video'));
            const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
            const imageName = imageKey();
            const imageBuffer = await this.compressImage(imageFile.buffer);
            const imageParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: imageName,
                Body: imageBuffer,
                ContentType: imageFile.mimetype
            };
            const imageResult = await this.s3Client.send(new client_s3_1.PutObjectCommand(imageParams));
            if (!imageResult)
                throw new Error("unable to upload the image");
            const trailerKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
            const trailerName = trailerKey();
            const trailerParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: trailerName,
                Body: trailerFile.buffer,
                ContentType: trailerFile.mimetype
            };
            const trailerResult = await this.s3Client.send(new client_s3_1.PutObjectCommand(trailerParams));
            if (!trailerResult)
                throw new Error("unable to upload the image");
            const categoryId = new mongoose_1.Types.ObjectId(otherData.courseCategory);
            const instructorObjectId = new mongoose_1.Types.ObjectId(instructorId);
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
            if (!course)
                throw new Error("Unable to create the course");
            console.log("in4");
            const fields = JSON.parse(otherData.fields);
            const uploadedVideos = await Promise.all(videoFiles.map(async (videoFile, index) => {
                const videoKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
                const videoName = videoKey();
                const videoParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: videoName,
                    Body: videoFile.buffer,
                    ContentType: videoFile.mimetype
                };
                const videoResult = await this.s3Client.send(new client_s3_1.PutObjectCommand(videoParams));
                if (!videoResult)
                    throw new Error("unable to upload the video");
                const saveVideo = await this.videoModel.create({
                    instructorId: instructorObjectId,
                    index: index,
                    title: fields[index].videoTitle,
                    description: fields[index].videoDescription,
                    file: videoName,
                    courseId: course._id
                });
                if (!saveVideo)
                    return new Error("Unable to save video");
                const updateCourse = await this.courseModel.updateOne({ _id: course._id }, {
                    $push: { videos: saveVideo._id }
                });
                if (!updateCourse)
                    throw new Error("Video saving to course failed");
                return true;
            }));
            console.log("in5");
            if (!uploadedVideos)
                return new Error("upload failed");
            return { status: "success", message: "Course created successfully" };
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async updateCourseInformation(files, trailer, otherData, instructorId) {
        try {
            const key = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
            let newImageFileName = key();
            let newTrailerFileName = key();
            if (files) {
                const imageFile = files.find(item => item.mimetype.includes('image'));
                if (imageFile) {
                    const deleteImageParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: otherData.oldImage,
                    };
                    const deleteImageCommand = new client_s3_1.DeleteObjectCommand(deleteImageParams);
                    await this.s3Client.send(deleteImageCommand);
                    const imageBuffer = await this.compressImage(imageFile.buffer);
                    const imageParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newImageFileName,
                        Body: imageBuffer,
                        ContentType: imageFile.mimetype
                    };
                    const command = new client_s3_1.PutObjectCommand(imageParams);
                    await this.s3Client.send(command);
                }
                else {
                    newImageFileName = otherData.oldImage;
                }
            }
            else {
                newImageFileName = otherData.oldImage;
            }
            if (trailer) {
                const trailerFile = trailer.find(item => item.mimetype.includes('video'));
                if (trailerFile) {
                    const deleteTrailerParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: otherData.oldTrailer,
                    };
                    const deleteTrailerCommand = new client_s3_1.DeleteObjectCommand(deleteTrailerParams);
                    await this.s3Client.send(deleteTrailerCommand);
                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newTrailerFileName,
                        Body: trailerFile.buffer,
                        ContentType: trailerFile.mimetype
                    };
                    const command = new client_s3_1.PutObjectCommand(videoParams);
                    await this.s3Client.send(command);
                }
                else {
                    newTrailerFileName = otherData.oldTrailer;
                }
            }
            else {
                newTrailerFileName = otherData.oldTrailer;
            }
            const categoryId = new mongoose_1.Types.ObjectId(otherData.courseCategory);
            const courseId = new mongoose_1.Types.ObjectId(otherData.id);
            const course = await this.courseModel.updateOne({ _id: courseId }, {
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
            });
            if (!course)
                throw new Error("Unable to Update the course information");
            return { status: "success", message: "Course Updated successfully" };
        }
        catch (error) {
            console.log(error.message);
            throw error;
        }
    }
    async updateSingleChapter(files, id, formData) {
        try {
            const { videoId, oldVideo, title, description, courseId } = formData;
            const ObjVideoId = new mongoose_1.Types.ObjectId(videoId);
            const key = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
            let newVidoeFileName = key();
            if (files.length > 0) {
                const videoFile = files.find(item => item.mimetype.includes('video'));
                if (videoFile) {
                    const deleteVideoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: oldVideo,
                    };
                    const deleteTrailerCommand = new client_s3_1.DeleteObjectCommand(deleteVideoParams);
                    await this.s3Client.send(deleteTrailerCommand);
                    const videoParams = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: newVidoeFileName,
                        Body: videoFile.buffer,
                        ContentType: videoFile.mimetype
                    };
                    const command = new client_s3_1.PutObjectCommand(videoParams);
                    await this.s3Client.send(command);
                }
                else {
                    newVidoeFileName = oldVideo;
                }
            }
            else {
                newVidoeFileName = oldVideo;
            }
            if (videoId) {
                await this.videoModel.updateOne({ _id: new mongoose_1.Types.ObjectId(videoId) }, {
                    $set: {
                        title,
                        description,
                        file: newVidoeFileName
                    }
                });
            }
            const instructorCourseContentData = await this.editCourseContent(courseId);
            if (!instructorCourseContentData)
                throw new Error('unable to get the updated course Data');
            console.log(instructorCourseContentData);
            return instructorCourseContentData;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updateCourseContent(files, otherData, instructorId) {
        try {
            const videoFiles = files.filter(item => item.mimetype.includes('video'));
            const instructorObjectId = new mongoose_1.Types.ObjectId(instructorId);
            const courseId = new mongoose_1.Types.ObjectId(otherData.courseId);
            const fields = JSON.parse(otherData.fields);
            const uploadedVideos = await Promise.all(videoFiles.map(async (videoFile, index) => {
                const videoKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
                const videoName = videoKey();
                const videoParams = {
                    Bucket: process.env.BUCKET_NAME,
                    Key: videoName,
                    Body: videoFile.buffer,
                    ContentType: videoFile.mimetype
                };
                const command = new client_s3_1.PutObjectCommand(videoParams);
                await this.s3Client.send(command);
                const saveVideo = await this.videoModel.create({
                    instructorId: instructorObjectId,
                    index: index,
                    title: fields[index].videoTitle,
                    description: fields[index].videoDescription,
                    file: videoName,
                    courseId: courseId
                });
                if (!saveVideo)
                    return new Error("Unable to save video");
                console.log(courseId);
                const updateCourse = await this.courseModel.updateOne({ _id: courseId }, {
                    $push: { videos: saveVideo._id }
                });
                console.log("here2");
                console.log(updateCourse);
                if (!updateCourse)
                    throw new Error("Video saving to course failed");
                return true;
            }));
            if (!uploadedVideos)
                return new Error("upload failed");
            console.log(otherData.courseId);
            const instructorCourseContentData = await this.editCourseContent(otherData.courseId);
            if (!instructorCourseContentData)
                throw new Error('unable to get the updated course Data');
            console.log("Data is", instructorCourseContentData);
            return instructorCourseContentData;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }
    async getInstructorCourse(instructorId) {
        try {
            const objInstructorId = new mongoose_1.Types.ObjectId(instructorId);
            const courses = await this.courseModel.find({ instructorId: objInstructorId }, { video: 0 });
            const courseWithPreSignedUrls = await Promise.all(courses.map(async (item) => {
                item.thumbnail = await this.signedUrlService.generateSignedUrl(item.thumbnail);
                return item;
            }));
            return courseWithPreSignedUrls;
        }
        catch (error) {
            console.error('Error in getInstructorCourse:', error);
            throw new Error(error);
        }
    }
    async editCourse(id) {
        const courseId = new mongoose_1.Types.ObjectId(id);
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
            ]);
            if (course.length < 1)
                throw new common_1.NotFoundException("Course not found");
            const courseWithPreSignedUrls = await Promise.all(course.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.thumbnail);
                return item;
            }));
            return courseWithPreSignedUrls[0];
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }
    async editCourseContent(id) {
        try {
            const courseId = new mongoose_1.Types.ObjectId(id);
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
            ]);
            if (course.length < 1)
                throw new common_1.NotFoundException("No data found");
            return course;
        }
        catch (error) {
            console.log(error.message);
            throw new Error(error);
        }
    }
    async deleteCourse(courseId, instructorId) {
        const objCourseId = new mongoose_1.Types.ObjectId(courseId);
        const course = await this.courseModel.findOne({ _id: objCourseId });
        if (!course)
            throw new common_1.NotFoundException("Course not found");
        if (course.students.length > 0)
            throw new common_1.NotFoundException("Students are enrolled unable to delete");
        const imageParams = {
            Bucket: this.configService.getOrThrow('BUCKET_NAME'),
            Key: course.thumbnail,
        };
        const deleteImageFromS3 = await this.s3Client.send(new client_s3_1.DeleteObjectCommand(imageParams));
        if (!deleteImageFromS3)
            throw new Error("Unable to delete the thumbnail");
        course.videos.forEach(async (item) => {
            const video = await this.videoModel.findOne({ _id: item });
            if (!video)
                throw new common_1.NotFoundException("Video not found");
            const deleteVideo = await this.videoModel.deleteOne({ _id: item });
            if (!deleteVideo)
                throw new Error("Unable to delete video");
            const videoParams = {
                Bucket: this.configService.getOrThrow('BUCKET_NAME'),
                Key: video.file,
            };
            const deleteVideoFromS3 = await this.s3Client.send(new client_s3_1.DeleteObjectCommand(videoParams));
            if (!deleteVideoFromS3)
                throw new Error("Unable to delete the video");
        });
        const deleteCourse = await this.courseModel.deleteOne({ _id: objCourseId });
        return this.getInstructorCourse(instructorId);
    }
    async deleteChapter(videoId) {
        try {
            if (!videoId)
                throw new Error('Id is not present');
            const videoObjId = new mongoose_1.Types.ObjectId(videoId);
            const findVideo = await this.videoModel.findOne({ _id: videoObjId });
            const videoParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: findVideo.file,
            };
            const deleteFromS3 = await this.s3Client.send(new client_s3_1.DeleteObjectCommand(videoParams));
            if (!deleteFromS3)
                throw new Error('Unable to delete the video');
            const courserObjId = new mongoose_1.Types.ObjectId(findVideo.courseId);
            const deleteVideo = await this.videoModel.deleteOne({ _id: videoObjId });
            const deleteVideoFromCourse = await this.courseModel.updateOne({ _id: courserObjId }, {
                $pull: {
                    videos: videoObjId
                }
            });
            const result = Promise.all([deleteVideo, deleteVideoFromCourse]);
            if (!result)
                throw new Error('issue deleting the video');
            const instructorCourseContentData = await this.editCourseContent(String(findVideo.courseId));
            if (!instructorCourseContentData)
                throw new Error('unable to get the updated course Data');
            console.log("Data is", instructorCourseContentData);
            return instructorCourseContentData;
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(instructor_schema_1.Instructor.name)),
    __param(2, (0, mongoose_2.InjectModel)(course_schema_1.Course.name)),
    __param(3, (0, mongoose_2.InjectModel)(video_schema_1.Video.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        config_1.ConfigService,
        mongoose_1.Model,
        mongoose_1.Model,
        nestjs_sharp_1.SharpService,
        signed_url_service_1.SignedUrlService])
], CourseService);
//# sourceMappingURL=course.service.js.map