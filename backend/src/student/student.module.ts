import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { StudentAuthController } from './controllers/student_auth.controller';
import { StudentAuthService } from './services/student-auth.service';
import { StudentJwtStrategy } from './strategy/studentJwt.strategy';
import { studentSchema } from './schema/student.schema';
import { ProfileController } from './controllers/profile.controller';
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


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_CLIENT,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_CLIENT },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'sanjayms1321999@gmail.com',
          pass: 'bnovdijcbozmyvgx'
        }
      },
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Course', schema: courseSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),

  ],
  controllers: [
    StudentAuthController,
    ProfileController,
    StudentCourseController,
    CategoryController
  ],
  providers: [
    StudentAuthService,
    StudentJwtStrategy,
    StudentCourseService,
    JwtService,
    studentJwtAuthGuard,
    CategoryService,
    SignedUrlService
  ],
  exports: [StudentJwtStrategy, PassportModule, studentJwtAuthGuard],
})
export class StudentModule { }