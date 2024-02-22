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
exports.InstructorAuthController = void 0;
const common_1 = require("@nestjs/common");
const signDto_1 = require("../../common/dtos/signDto");
const instructor_auth_service_1 = require("../services/instructor-auth.service");
const loginDto_1 = require("../../common/dtos/loginDto");
let InstructorAuthController = class InstructorAuthController {
    constructor(instructorAuthService) {
        this.instructorAuthService = instructorAuthService;
    }
    signUp(signUpDto) {
        return this.instructorAuthService.signUp(signUpDto);
    }
    login(loginData) {
        console.log(loginData);
        return this.instructorAuthService.login(loginData);
    }
};
exports.InstructorAuthController = InstructorAuthController;
__decorate([
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signDto_1.SignupDto]),
    __metadata("design:returntype", void 0)
], InstructorAuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginDto_1.LoginDto]),
    __metadata("design:returntype", void 0)
], InstructorAuthController.prototype, "login", null);
exports.InstructorAuthController = InstructorAuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [instructor_auth_service_1.InstructorAuthService])
], InstructorAuthController);
//# sourceMappingURL=instructor-auth.controller.js.map