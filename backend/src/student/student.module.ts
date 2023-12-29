import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { StudentAuthController } from './controllers/student_auth/student_auth.controller';
import { StudentAuthService } from './services/student-auth/student-auth.service';
import { StudentJwtStrategy } from './strategy/studentJwt.strategy';
import { studentSchema } from './schema/student.schema';
import { ProfileController } from './controllers/profile/profile.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_CLIENT,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_CLIENT },
    }),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
  ],
  controllers: [
    StudentAuthController,
    ProfileController
  ],
  providers: [
    StudentAuthService,
    StudentJwtStrategy,
    JwtService
  ],
  exports: [StudentJwtStrategy, PassportModule],
})
export class StudentModule { }