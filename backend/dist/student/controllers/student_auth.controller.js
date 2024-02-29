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
exports.StudentAuthController = void 0;
const common_1 = require("@nestjs/common");
const signDto_1 = require("../../common/dtos/signDto");
const student_auth_service_1 = require("../services/student-auth.service");
let StudentAuthController = class StudentAuthController {
    constructor(studentAuthService) {
        this.studentAuthService = studentAuthService;
    }
    async signUp(signUpDto) {
        try {
            const registerStudent = await this.studentAuthService.signUp(signUpDto);
            const otpresult = this.studentAuthService.sendOTP(registerStudent.email);
            if (!otpresult)
                throw new Error("OTP not sent");
            return { email: registerStudent.email };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyOtp(otpData) {
        const studentData = await this.studentAuthService.verifyOtp(otpData);
        return studentData;
    }
    async resendOtp(data) {
        await this.studentAuthService.sendOTP(data.email);
    }
    async login(loginData) {
        return await this.studentAuthService.login(loginData);
    }
    async forgotPassword(data) {
        return this.studentAuthService.forgotPassword(data.email);
    }
    async resetPassword(data) {
        return this.studentAuthService.resetPassword(data.token, data.password);
    }
};
exports.StudentAuthController = StudentAuthController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signDto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Put)('/verifyOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Put)('/resendOtp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "resendOtp", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('/resetPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StudentAuthController.prototype, "resetPassword", null);
exports.StudentAuthController = StudentAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [student_auth_service_1.StudentAuthService])
], StudentAuthController);
//# sourceMappingURL=student_auth.controller.js.map