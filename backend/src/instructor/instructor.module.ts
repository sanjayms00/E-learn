import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { InstructorAuthController } from './controllers/instructor-auth.controller';
import { InstructorAuthService } from './services/instructor-auth.service';
import { instructorJwtStrategy } from './strategy/instructorJwt.strategy';
import { instructorSchema } from './schema/instructor.schema';
import { InstructorCourseController } from './controllers/instructor-course.controller';
import { CourseService } from './services/course.service';
import { courseSchema } from './schema/course.schema';
import { InstructorJwtAuthGuard } from './guard/instructor.guard';
import { VideoSchema } from './schema/video.schema';
// import { SignedUrlService } from 'src/common/service/signed-url.service';
import { InstructorProfileController } from './controllers/instructor-profile.controller';
import { InstructorProfileService } from './services/instructor-profile.service';
import { InstructorMiddleware } from './middlewares/instructor.middleware';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'instructor-jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_INSTRUCTOR,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_INSTRUCTOR },
    }),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    MongooseModule.forFeature([{ name: 'Video', schema: VideoSchema }]),
  ],
  controllers: [
    InstructorAuthController,
    InstructorCourseController,
    InstructorProfileController
  ],
  providers: [
    InstructorAuthService,
    InstructorProfileService,
    CourseService,
    instructorJwtStrategy,
    JwtService,
    InstructorJwtAuthGuard
  ],
  exports: [
    instructorJwtStrategy,
    PassportModule,
    InstructorJwtAuthGuard
  ],

})
export class InstructorModule implements NestModule { 

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(InstructorMiddleware)
      .forRoutes('instructor');
  }

}