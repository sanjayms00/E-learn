import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../schema/student.schema';
import { Types } from 'mongoose';
import { Video } from 'src/instructor/schema/video.schema';
import { Course } from 'src/instructor/schema/course.schema';


@Injectable()
export class LearningService {

    constructor(
        @InjectModel(Student.name) private studentModel: Model<Student>,
        @InjectModel(Video.name) private videoModel: Model<Video>,
        @InjectModel(Course.name) private courseModel: Model<Course>,
    ) { }

    //get student course
    async getMyCourses(studentId: string) {
        try {

            if (!studentId) throw new NotFoundException("Id is not found")

            const objStudentId = new Types.ObjectId(studentId)

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
                    $unwind: '$myCourses'  // Add this $unwind stage
                },
                {
                    $project: {
                        _id: 1,
                        progress: '$courses.progress',
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
            ])
            return courses
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    //get course data and video for streaming
    async streamCourseData(courseId: string, videoId: string, studentId: string) {
        try {
            const objCourseId = new Types.ObjectId(courseId);
            const objStudentId = new Types.ObjectId(studentId);
            const objVideoId = new Types.ObjectId(videoId);

            //find course present in student
            const studentData = await this.findStudentCourse(objStudentId, objCourseId)

            if (!studentData) throw new UnauthorizedException("Not allowed")

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
            ])

            console.log(courseData)
            if (!courseData) throw new NotFoundException();

            console.log(studentData)

            return { courseData, studentData }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    // update Chapter Viewed in course
    async updateChapterViewed(studentId, chapterId, courseId) {
        try {
            const objStudentId = new Types.ObjectId(studentId)
            const objChapterId = new Types.ObjectId(chapterId)
            const objCourseId = new Types.ObjectId(courseId)

            const updateResult = await this.studentModel.updateOne(
                {
                    _id: objStudentId,
                    "courses.courseId": objCourseId
                },
                {
                    $addToSet: { "courses.$.watched": objChapterId }
                }
            )
            if (updateResult.modifiedCount < 1) throw new NotFoundException('Document not found or not updated.')

            const studentupdatedCourse = this.findStudentCourse(objStudentId, objCourseId)

            if (!studentupdatedCourse) throw new NotFoundException('Document not found or not updated.')

            return studentupdatedCourse
        } catch (error) {
            // console.log(error.message)
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }


    //get the viewed videos of course added in student
    async findStudentCourse(objStudentId, objCourseId) {
        return await this.studentModel.findOne(
            { _id: objStudentId, "courses.courseId": objCourseId },
            { "courses.$": 1 }
        )
    }


}
