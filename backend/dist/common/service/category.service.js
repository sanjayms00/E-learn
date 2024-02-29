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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../../admin/schema/category.schema");
const course_schema_1 = require("../../instructor/schema/course.schema");
let CategoryService = class CategoryService {
    constructor(categoryModel, courseModel) {
        this.categoryModel = categoryModel;
        this.courseModel = courseModel;
    }
    async fetchCategories() {
        const catrgoryData = await this.categoryModel.find({});
        return catrgoryData;
    }
    async fetchActiveCategories() {
        const categories = await this.categoryModel.find({ status: true });
        if (!categories)
            throw new common_1.NotFoundException('');
        return categories;
    }
    async addCategory(data) {
        try {
            const category = await this.categoryModel.findOne({
                categoryName: data.category
            });
            if (category)
                throw new Error("Category already exist");
            await this.categoryModel.create({
                categoryName: data.category,
                status: true
            });
            return await this.fetchCategories();
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async removeCategory(categoryId) {
        try {
            const course = await this.courseModel.findOne({ categoryId: new mongoose_2.Types.ObjectId(categoryId) });
            if (course) {
                throw new Error("Category already in use, unable to delete");
            }
            await this.categoryModel.deleteOne({
                _id: new mongoose_2.Types.ObjectId(categoryId),
            });
            return await this.fetchCategories();
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_schema_1.Course.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map