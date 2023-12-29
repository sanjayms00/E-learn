import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CourseService {

    private readonly s3Client = new S3Client({
        //set region
        region: this.configService.getOrThrow('AWS_S3_REGION')
    })

    constructor(private readonly configService: ConfigService) {}

    async uploadCourse(fileName:string, file: Buffer){
        await this.s3Client.send(
           new PutObjectCommand({
            Bucket: 'elearn-app-assets',
            Key: fileName,
            Body: file
           })
        )
    }


}
