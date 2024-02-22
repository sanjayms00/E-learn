import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { SharpService } from 'nestjs-sharp';
import { SignedUrlService } from './signed-url.service';

@Injectable()
export class UploadService {


    private s3Client: any


    constructor(
        private readonly configService: ConfigService,
        private sharpService: SharpService,
        private signedUrlService: SignedUrlService
    ) {
        this.s3Client = new S3Client({
            region: this.configService.getOrThrow("AWS_S3_REGION")
        });
    }


    async uploadImage(image) {

        const imageKey = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

        const imageName = imageKey()

        const imageBuffer = await this.compressImage(image.buffer)

        const imageParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: imageName,
            Body: imageBuffer,
            ContentType: image.mimetype
        };

        const imageResult = await this.s3Client.send(
            new PutObjectCommand(imageParams)
        )

        const imageSignedUrl = await this.signedUrlService.generateSignedUrl(imageName)

        console.log(imageName, imageSignedUrl)

        return {
            imageName,
            imageSignedUrl
        }

    }


    async compressImage(inputBuffer: Buffer): Promise<Buffer> {
        return await this.sharpService
            .edit(inputBuffer)
            .jpeg({ quality: 80 })
            .toBuffer();
    }


}

