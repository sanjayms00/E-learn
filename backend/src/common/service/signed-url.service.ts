import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SignedUrlService {

    private client: any;

    constructor(private configService: ConfigService) {
        this.client = new S3Client({
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
        const command: any = new GetObjectCommand(getImageObjectParams);
        const signedUrl = await getSignedUrl(this.client, command, { expiresIn: 60 * 60 })
        return signedUrl
    }


}
