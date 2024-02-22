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
exports.ReviewRatingController = void 0;
const common_1 = require("@nestjs/common");
const review_rating_service_1 = require("../services/review-rating.service");
const student_guard_1 = require("../guards/student.guard");
let ReviewRatingController = class ReviewRatingController {
    constructor(reviewRatingService) {
        this.reviewRatingService = reviewRatingService;
    }
    reviewAndRateCourse(data, req) {
        return this.reviewRatingService.reviewAndRateCourse(data, req.user.id);
    }
};
exports.ReviewRatingController = ReviewRatingController;
__decorate([
    (0, common_1.UseGuards)(student_guard_1.studentJwtAuthGuard),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReviewRatingController.prototype, "reviewAndRateCourse", null);
exports.ReviewRatingController = ReviewRatingController = __decorate([
    (0, common_1.Controller)('review-rating'),
    __metadata("design:paramtypes", [review_rating_service_1.ReviewRatingService])
], ReviewRatingController);
//# sourceMappingURL=review-rating.controller.js.map