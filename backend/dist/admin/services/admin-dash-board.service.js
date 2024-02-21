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
exports.AdminDashBoardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
const student_schema_1 = require("../../student/schema/student.schema");
let AdminDashBoardService = class AdminDashBoardService {
    constructor(studentModel, InstructorModel) {
        this.studentModel = studentModel;
        this.InstructorModel = InstructorModel;
    }
    async adminDashBoard() {
        const student = await this.studentCount();
        const instructor = await this.instructorCount();
        const graph = await this.graphData();
        return {
            student, instructor, graph
        };
    }
    async studentCount() {
        const students = await this.studentModel.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        if (students.length < 1)
            throw new common_1.NotFoundException("No students found");
        return students;
    }
    async instructorCount() {
        const instructor = await this.InstructorModel.aggregate([
            {
                $match: {}
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        if (instructor.length < 1)
            throw new common_1.NotFoundException("No instructor found");
        return instructor;
    }
    async graphData() {
        const today = new Date();
        const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const studentData = this.studentModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: oneMonthAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]);
        return studentData;
    }
};
exports.AdminDashBoardService = AdminDashBoardService;
exports.AdminDashBoardService = AdminDashBoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(1, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AdminDashBoardService);
//# sourceMappingURL=admin-dash-board.service.js.map