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
exports.ClientManagementController = void 0;
const common_1 = require("@nestjs/common");
const status_dto_1 = require("../dtos/status.dto");
const adminJwtAuth_guard_1 = require("../guards/adminJwtAuth.guard");
const client_service_1 = require("../services/client.service");
let ClientManagementController = class ClientManagementController {
    constructor(clientService) {
        this.clientService = clientService;
    }
    async getStudents() {
        return await this.clientService.getAllStudents();
    }
    async getInstructors() {
        return await this.clientService.getAllInstructors();
    }
    async changeStudentStatus(data) {
        return await this.clientService.changeStudentStatus(data);
    }
    async changeInstructorStatus(data) {
        return await this.clientService.changeInstructorStatus(data);
    }
};
exports.ClientManagementController = ClientManagementController;
__decorate([
    (0, common_1.UseGuards)(adminJwtAuth_guard_1.AdminJwtAuthGuard),
    (0, common_1.Get)('students'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientManagementController.prototype, "getStudents", null);
__decorate([
    (0, common_1.UseGuards)(adminJwtAuth_guard_1.AdminJwtAuthGuard),
    (0, common_1.Get)('instructors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientManagementController.prototype, "getInstructors", null);
__decorate([
    (0, common_1.UseGuards)(adminJwtAuth_guard_1.AdminJwtAuthGuard),
    (0, common_1.Patch)('student-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_dto_1.statusDto]),
    __metadata("design:returntype", Promise)
], ClientManagementController.prototype, "changeStudentStatus", null);
__decorate([
    (0, common_1.UseGuards)(adminJwtAuth_guard_1.AdminJwtAuthGuard),
    (0, common_1.Patch)('instructor-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_dto_1.statusDto]),
    __metadata("design:returntype", Promise)
], ClientManagementController.prototype, "changeInstructorStatus", null);
exports.ClientManagementController = ClientManagementController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [client_service_1.ClientService])
], ClientManagementController);
//# sourceMappingURL=client-management.controller.js.map