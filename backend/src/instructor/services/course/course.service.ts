import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Instructor } from 'src/instructor/schema/instructor.schema';
import { Course } from 'src/instructor/schema/course.schema';
import { InjectModel } from '@nestjs/mongoose';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CourseService {

    private s3 = new S3();

    constructor(
        @InjectModel(Instructor.name)
        private instructorModel: Model<Instructor>,
        private configService : ConfigService,
        @InjectModel(Course.name)
        private courseModel : Model<Course>
    ) {}

    async uploadCourse(files:{ imageFile: Express.Multer.File[], videoFile: Express.Multer.File[] }, otherData){
        try {
            const imageFile = files.imageFile[0];
            const videoFile = files.videoFile[0];

            const imageParams = {
                Bucket: 'elearn-app-assets',
                Key: `${uuidv4()}-${imageFile.originalname}`,
                Body: imageFile.buffer,
              };
        
              const videoParams = {
                Bucket: 'elearn-app-assets',
                Key: `${uuidv4()}-${videoFile.originalname}`,
                Body: videoFile.buffer,
              };

            const [imageResult, videoResult] = await Promise.all([
                this.s3.upload(imageParams).promise(),
                this.s3.upload(videoParams).promise(),
              ]);
            
            
              this.courseModel.create({
                courseName: otherData.course,
                price: otherData.price,
                description : otherData.description,
                imageFileUrl: imageResult.Location,
                videoFileUrl: videoResult.Location,
              });

            return "course created"

        } catch (error) {
            console.log(error.messasge)
            throw(error)
        }
        
    }

    getCourses(){
        return this.courseModel.find({})
    }


    getFile(key){
        const params = {
            Bucket: 'elearn-app-assets',
            Key: key,
          };
        return this.s3.getObject(params).createReadStream();
    }


    async listFilesInBucket() {
        try {
            const bucketName =  "elearn-app-assets"
            const data = await this.s3.listObjectsV2({ Bucket: bucketName }).promise();
            return data.Contents; // Array of file objects
        } catch (error) {
            console.error('Error listing files:', error);
            throw error;
        }
    }


}
