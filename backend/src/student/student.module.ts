import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { StudentAuthController } from './controllers/student_auth.controller';
import { StudentAuthService } from './services/student-auth.service';
import { StudentJwtStrategy } from './strategy/studentJwt.strategy';
import { studentSchema } from './schema/student.schema';
import { StudentCourseController } from './controllers/student-course.controller';
import { StudentCourseService } from './services/student-course.service';
import { courseSchema } from 'src/instructor/schema/course.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { instructorSchema } from 'src/instructor/schema/instructor.schema';
import { CategorySchema } from 'src/admin/schema/category.schema';
import { studentJwtAuthGuard } from './guards/student.guard';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from 'src/common/service/category.service';
import { SignedUrlService } from 'src/common/service/signed-url.service';
import { LearningController } from './controllers/learning.controller';
import { LearningService } from './services/learning.service';
import { VideoSchema } from 'src/instructor/schema/video.schema';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { tokenSchema } from './schema/token.schema';
import { StudentMiddleware } from './middlewares/student.middleware';
import { ReviewRatingController } from './controllers/review-rating.controller';
import { ReviewRatingService } from './services/review-rating.service';
import { RatingReviewSchema } from './schema/ratingReview.schema';
import { StudentProfileService } from './services/student-profile.service';
import { StudentProfileController } from './controllers/student-profile.controller';
import { SharpService } from 'nestjs-sharp';


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_CLIENT,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_CLIENT },
    }),
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'mail'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
    MongooseModule.forFeature([{ name: 'Token', schema: tokenSchema }]),
    MongooseModule.forFeature([{ name: 'RatingReview', schema: RatingReviewSchema }]),
  ],
  controllers: [
    StudentAuthController,
    StudentProfileController,
    StudentCourseController,
    CategoryController,
    LearningController,
    ReviewRatingController
  ],
  providers: [
    StudentAuthService,
    StudentJwtStrategy,
    StudentCourseService,
    StudentProfileService,
    JwtService,
    studentJwtAuthGuard,
    CategoryService,
    SignedUrlService,
    LearningService,
    ReviewRatingService,
    SharpService
  ],
  exports: [
    StudentJwtStrategy,
    PassportModule,
    studentJwtAuthGuard
  ],
})
export class StudentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StudentMiddleware)
      .exclude(
        { path: 'student/webhook', method: RequestMethod.ALL },
        { path: 'student/home-courses', method: RequestMethod.ALL },
        { path: 'student/all-courses', method: RequestMethod.ALL },
        { path: 'student/search/:searchText', method: RequestMethod.ALL },
        { path: 'student/filter', method: RequestMethod.ALL },
        { path: 'student/instructors', method: RequestMethod.ALL },
      )
      .forRoutes(
        StudentProfileController,
        StudentCourseController,
        LearningController
      );
  }
}