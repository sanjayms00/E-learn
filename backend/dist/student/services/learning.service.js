"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("../schema/student.schema");
const mongoose_3 = require("mongoose");
const video_schema_1 = require("../../instructor/schema/video.schema");
const course_schema_1 = require("../../instructor/schema/course.schema");
const signed_url_service_1 = require("../../common/service/signed-url.service");
let LearningService = class LearningService {
    constructor(studentModel, videoModel, courseModel, signedUrlService) {
        this.studentModel = studentModel;
        this.videoModel = videoModel;
        this.courseModel = courseModel;
        this.signedUrlService = signedUrlService;
    }
    async getMyCourses(studentId) {
        try {
            if (!studentId)
                throw new common_1.NotFoundException("Id is not found");
            const objStudentId = new mongoose_3.Types.ObjectId(studentId);
            const courses = await this.studentModel.aggregate([
                {
                    $match: {
                        _id: objStudentId
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
                    $lookup: {
                        from: 'instructors',
                        localField: 'myCourses.instructorId',
                        foreignField: '_id',
                        as: 'instructorData'
                    }
                },
                {
                    $unwind: '$myCourses'
                },
                {
                    $project: {
                        _id: 1,
                        progress: '$courses.progress',
                        watched: '$courses.watched',
                        'myCourses.reviews': 1,
                        'myCourses._id': 1,
                        'myCourses.courseName': 1,
                        'myCourses.thumbnail': 1,
                        'myCourses.instructorId': 1,
                        'myCourses.courseTags': 1,
                        'myCourses.courseLevel': 1,
                        'myCourses.videos': 1,
                        'myCourses.updatedAt': 1,
                        'instructorName': { $arrayElemAt: ['$instructorData.fullName', 0] }
                    }
                }
            ]);
            const courseWithPresignedUrls = await Promise.all(courses.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.myCourses.thumbnail);
                return item;
            }));
            return courseWithPresignedUrls;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async streamCourseData(courseId, videoId, studentId) {
        try {
            const objCourseId = new mongoose_3.Types.ObjectId(courseId);
            const objStudentId = new mongoose_3.Types.ObjectId(studentId);
            const objVideoId = new mongoose_3.Types.ObjectId(videoId);
            const studentData = await this.findStudentCourse(objStudentId, objCourseId);
            if (!studentData)
                throw new common_1.UnauthorizedException("Not allowed");
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
                },
                {
                    $lookup: {
                        from: "instructors",
                        localField: 'instructorId',
                        foreignField: "_id",
                        as: "instructorData"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        courseName: 1,
                        description: 1,
                        content: 1,
                        instructorId: 1,
                        videoData: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            file: 1,
                        },
                        instructorData: {
                            fullName: 1,
                            email: 1,
                            mobile: 1,
                        }
                    }
                }
            ]);
            if (courseData.length < 1)
                throw new common_1.NotFoundException();
            courseData[0].videoData = await Promise.all(courseData[0].videoData.map(async (item) => {
                item.signedUrl = await this.signedUrlService.generateSignedUrl(item.file);
                return item;
            }));
            return {
                courseData,
                studentData
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateChapterViewed(studentId, chapterId, courseId) {
        try {
            const objStudentId = new mongoose_3.Types.ObjectId(studentId);
            const objChapterId = new mongoose_3.Types.ObjectId(chapterId);
            const objCourseId = new mongoose_3.Types.ObjectId(courseId);
            const updateResult = await this.studentModel.updateOne({
                _id: objStudentId,
                "courses.courseId": objCourseId
            }, {
                $addToSet: { "courses.$.watched": objChapterId }
            });
            if (updateResult.modifiedCount < 1)
                throw new common_1.NotFoundException('Document not found or not updated.');
            const studentupdatedCourse = this.findStudentCourse(objStudentId, objCourseId);
            if (!studentupdatedCourse)
                throw new common_1.NotFoundException('Document not found or not updated.');
            return studentupdatedCourse;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findStudentCourse(objStudentId, objCourseId) {
        return await this.studentModel.findOne({ _id: objStudentId, "courses.courseId": objCourseId }, { "courses.$": 1 });
    }
};
exports.LearningService = LearningService;
exports.LearningService = LearningService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(1, (0, mongoose_1.InjectModel)(video_schema_1.Video.name)),
    __param(2, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        signed_url_service_1.SignedUrlService])
], LearningService);
//# sourceMappingURL=learning.service.js.map