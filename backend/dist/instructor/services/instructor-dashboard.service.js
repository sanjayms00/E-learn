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
exports.InstructorDashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const course_schema_1 = require("../schema/course.schema");
const mongoose_2 = require("mongoose");
let InstructorDashboardService = class InstructorDashboardService {
    constructor(courseModel) {
        this.courseModel = courseModel;
    }
    async dashboardData(instructorId) {
        const counts = await this.dashCounts(instructorId);
        const graphData = await this.graphData(instructorId);
        return {
            counts,
            graphData
        };
    }
    async dashCounts(instructorId) {
        try {
            const objInstructorId = new mongoose_2.Types.ObjectId(instructorId);
            const dashDataCheck = await this.courseModel.find({ instructorId: objInstructorId });
            if (dashDataCheck.length < 1) {
                return {
                    courses: 0,
                    sold: 0,
                    rating: 0
                };
            }
            const dashData = await this.courseModel.aggregate([
                {
                    $match: { instructorId: objInstructorId }
                },
                {
                    $facet: {
                        totalCount: [
                            {
                                $count: "count"
                            }
                        ],
                        sold: [
                            {
                                $group: {
                                    _id: null,
                                    soldOutCourse: { $sum: { $size: "$students" } }
                                }
                            }
                        ],
                        otherData: [
                            {
                                $lookup: {
                                    from: "ratingreviews",
                                    localField: "reviews.reviewId",
                                    foreignField: "_id",
                                    as: "reviewData"
                                }
                            },
                            {
                                $unwind: "$reviewData"
                            },
                            {
                                $group: {
                                    _id: null,
                                    totalRating: { $sum: "$reviewData.rating" },
                                    totalReviews: { $sum: 1 }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    totalCourses: 1,
                                    averageRating: { $divide: ["$totalRating", "$totalReviews"] }
                                }
                            }
                        ]
                    }
                }
            ]);
            if (dashData.length < 1)
                throw new common_1.NotFoundException("Dashboard data not found");
            return {
                courses: dashData[0].totalCount[0].count,
                sold: dashData[0].sold[0].soldOutCourse,
                rating: dashData[0].otherData[0].averageRating
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async graphData(instructorId) {
        try {
            const objInstructorId = new mongoose_2.Types.ObjectId(instructorId);
            const today = new Date();
            const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            const graphData = await this.courseModel.aggregate([
                {
                    $match: {
                        instructorId: objInstructorId,
                        createdAt: { $gte: oneMonthAgo }
                    }
                },
                {
                    $group: {
                        _id: '$courseName',
                        count: { $sum: { $size: '$students' } },
                    },
                },
            ]);
            console.log(graphData);
            return graphData;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.InstructorDashboardService = InstructorDashboardService;
exports.InstructorDashboardService = InstructorDashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InstructorDashboardService);
//# sourceMappingURL=instructor-dashboard.service.js.map