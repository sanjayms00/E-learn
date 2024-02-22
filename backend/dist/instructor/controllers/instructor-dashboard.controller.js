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
exports.InstructorDashboardController = void 0;
const common_1 = require("@nestjs/common");
const instructor_guard_1 = require("../guard/instructor.guard");
const instructor_dashboard_service_1 = require("../services/instructor-dashboard.service");
let InstructorDashboardController = class InstructorDashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async profieData(req) {
        const instructorId = req.user.id;
        return await this.dashboardService.dashboardData(instructorId);
    }
};
exports.InstructorDashboardController = InstructorDashboardController;
__decorate([
    (0, common_1.UseGuards)(instructor_guard_1.InstructorJwtAuthGuard),
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstructorDashboardController.prototype, "profieData", null);
exports.InstructorDashboardController = InstructorDashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [instructor_dashboard_service_1.InstructorDashboardService])
], InstructorDashboardController);
//# sourceMappingURL=instructor-dashboard.controller.js.map