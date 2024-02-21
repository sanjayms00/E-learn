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
exports.InstructorAuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
const instructor_schema_1 = require("../schema/instructor.schema");
let InstructorAuthService = class InstructorAuthService {
    constructor(instructorModel, jwtService) {
        this.instructorModel = instructorModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpData) {
        const { fullName, mobile, email } = signUpData;
        const isinstructor = await this.instructorModel.findOne({ email: signUpData.email });
        if (isinstructor) {
            throw new common_1.ConflictException('instructor already exist');
        }
        const hashedPassword = await bcrypt.hash(signUpData.password, 10);
        const instructor = await this.instructorModel.create({
            fullName,
            email,
            mobile,
            password: hashedPassword,
            status: true,
        });
        const access_token = await this.jwtService.sign({ id: instructor._id }, { secret: process.env.JWT_SECRET_INSTRUCTOR });
        const instructorObject = instructor.toJSON();
        const { password, __v, ...result } = instructorObject;
        return {
            access_token,
            user: result
        };
    }
    async login(loginData) {
        const instructor = await this.instructorModel.findOne({ email: loginData.email });
        if (!instructor)
            throw new common_1.UnauthorizedException('Invalid email or password');
        if (instructor.status === false)
            throw new common_1.ForbiddenException('Access denied, instructor is blocked');
        const isPasswordMatched = await bcrypt.compare(loginData.password, instructor.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const access_token = this.jwtService.sign({ id: instructor._id }, { secret: process.env.JWT_SECRET_INSTRUCTOR });
        const instructorObject = instructor.toJSON();
        const { password, __v, ...result } = instructorObject;
        return {
            access_token,
            user: result
        };
    }
};
exports.InstructorAuthService = InstructorAuthService;
exports.InstructorAuthService = InstructorAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(instructor_schema_1.Instructor.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], InstructorAuthService);
//# sourceMappingURL=instructor-auth.service.js.map