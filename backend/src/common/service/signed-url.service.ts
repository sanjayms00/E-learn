import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { sign } from 'crypto';

@Injectable()
export class SignedUrlService {

    client: any = new S3Client({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        region: process.env.AWS_S3_REGION
    });

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
