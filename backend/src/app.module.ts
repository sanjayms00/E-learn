import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { InstructorModule } from './instructor/instructor.module';
import { RouterModule } from '@nestjs/core';



@Module({
  imports: [
    StudentModule,
    RouterModule.register([
      {
        path: 'student',
        module: StudentModule,
      },
    ]),
    AdminModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
      },
    ]),
    InstructorModule,
    RouterModule.register([
      {
        path: 'instructor',
        module: InstructorModule,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
  providers: [JwtService],
  controllers: [],
})
export class AppModule { }
