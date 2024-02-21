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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingReviewSchema = exports.RatingReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RatingReview = class RatingReview extends mongoose_2.Document {
};
exports.RatingReview = RatingReview;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "courses", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], RatingReview.prototype, "courseId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: "students", required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], RatingReview.prototype, "studentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], RatingReview.prototype, "rating", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RatingReview.prototype, "review", void 0);
exports.RatingReview = RatingReview = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], RatingReview);
exports.RatingReviewSchema = mongoose_1.SchemaFactory.createForClass(RatingReview);
//# sourceMappingURL=ratingReview.schema.js.map