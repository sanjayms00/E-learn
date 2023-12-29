import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
// import { ClientAuthController } from './controllers/client_auth/client_auth.controller';
// import { ClientAuthService } from './services/client-auth/client-auth.service';
// import { ClientJwtStrategy } from './strategy/clientJwt.strategy';
// import { clientSchema } from './schema/client.schema';
import { InstructorAuthController } from './controllers/instructor-auth/instructor-auth.controller';
import { InstructorAuthService } from './services/instructor-auth/instructor-auth.service';
import { instructorJwtStrategy } from './strategy/instructorJwt.strategy';
import { instructorSchema } from './schema/instructor.schema';
import { CourseController } from './controllers/course/course.controller';
import { CourseService } from './services/course/course.service';
// import { ProfileController } from './controllers/profile/profile.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'instructor-jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_INSTRUCTOR,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_INSTRUCTOR },
    }),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
  ],
  controllers: [
    InstructorAuthController,
    CourseController
  ],
  providers: [
    InstructorAuthService,
    CourseService,
    instructorJwtStrategy,
    JwtService
  ],
  exports: [instructorJwtStrategy, PassportModule],
})
export class InstructorModule { }