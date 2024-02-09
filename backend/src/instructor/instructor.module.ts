import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
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
import { InstructorDashboardController } from './controllers/instructor-dashboard.controller';
import { InstructorDashboardService } from './services/instructor-dashboard.service';
import { SharpModule } from 'nestjs-sharp';
import { SignedUrlService } from 'src/common/service/signed-url.service';

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
    SharpModule
  ],
  controllers: [
    InstructorAuthController,
    InstructorCourseController,
    InstructorProfileController,
    InstructorDashboardController
  ],
  providers: [
    InstructorAuthService,
    InstructorProfileService,
    InstructorDashboardService,
    CourseService,
    instructorJwtStrategy,
    JwtService,
    InstructorJwtAuthGuard,
    SignedUrlService
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
      .exclude(
      // { path: '', method: RequestMethod.ALL }
    )
      .forRoutes(
        InstructorCourseController,
        InstructorProfileController,
        InstructorDashboardController
      );
  }

}