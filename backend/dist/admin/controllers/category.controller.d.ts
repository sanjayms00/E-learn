/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CategoryService } from 'src/common/service/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAllCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getActiveCategories(): Promise<(import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addCategory(data: any): Promise<(import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    removeCategory(categoryId: string): Promise<(import("mongoose").Document<unknown, {}, import("../schema/category.schema").Category> & import("../schema/category.schema").Category & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
