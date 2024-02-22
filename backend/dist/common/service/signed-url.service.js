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
exports.SignedUrlService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SignedUrlService = class SignedUrlService {
    constructor(configService) {
        this.configService = configService;
        this.client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.configService.getOrThrow("AWS_ACCESS_KEY_ID"),
                secretAccessKey: this.configService.getOrThrow("AWS_SECRET_ACCESS_KEY"),
            },
            region: this.configService.getOrThrow("AWS_S3_REGION")
        });
    }
    async generateSignedUrl(key) {
        const getImageObjectParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: key
        };
        const command = new client_s3_1.GetObjectCommand(getImageObjectParams);
        const signedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.client, command, { expiresIn: 60 * 60 });
        return signedUrl;
    }
};
exports.SignedUrlService = SignedUrlService;
exports.SignedUrlService = SignedUrlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SignedUrlService);
//# sourceMappingURL=signed-url.service.js.map