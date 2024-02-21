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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const student_schema_1 = require("../../student/schema/student.schema");
const instructor_schema_1 = require("../../instructor/schema/instructor.schema");
let ClientService = class ClientService {
    constructor(studentModel, instructorModel) {
        this.studentModel = studentModel;
        this.instructorModel = instructorModel;
    }
    async getAllStudents() {
        return await this.studentModel.find({}, { password: 0, __v: 0 });
    }
    async getAllInstructors() {
        return await this.instructorModel.find({}, { password: 0, __v: 0 });
    }
    async changeStudentStatus(data) {
        try {
            if (!data.id) {
                throw new common_1.HttpException("Id is not found", common_1.HttpStatus.NOT_FOUND);
            }
            const id = new mongoose_2.Types.ObjectId(data.id);
            const result = await this.studentModel.updateOne({ _id: id }, {
                $set: {
                    status: data.status
                }
            });
            console.log(result);
            if (!result) {
                throw new common_1.HttpException("Document not found or status unchanged", common_1.HttpStatus.NOT_FOUND);
            }
            return { status: "updated" };
        }
        catch (error) {
            console.log(error.message);
            throw new common_1.HttpException("Failed to update status", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async changeInstructorStatus(data) {
        try {
            if (!data.id) {
                throw new common_1.HttpException("Id is not found", common_1.HttpStatus.NOT_FOUND);
            }
            const id = new mongoose_2.Types.ObjectId(data.id);
            const result = await this.instructorModel.updateOne({ _id: id }, {
                $set: {
                    status: data.status
                }
            });
            console.log(result);
            if (!result) {
                throw new common_1.HttpException("Document not found or status unchanged", common_1.HttpStatus.NOT_FOUND);
            }
            return { status: "updated" };
        }
        catch (error) {
            throw new common_1.HttpException("Failed to update status", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(student_schema_1.Student.name)),
    __param(1, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ClientService);
//# sourceMappingURL=client.service.js.map