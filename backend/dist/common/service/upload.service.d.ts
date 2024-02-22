/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { SharpService } from 'nestjs-sharp';
import { SignedUrlService } from './signed-url.service';
export declare class UploadService {
    private readonly configService;
    private sharpService;
    private signedUrlService;
    private s3Client;
    constructor(configService: ConfigService, sharpService: SharpService, signedUrlService: SignedUrlService);
    uploadImage(image: any): Promise<{
        imageName: string;
        imageSignedUrl: string;
    }>;
    compressImage(inputBuffer: Buffer): Promise<Buffer>;
}
