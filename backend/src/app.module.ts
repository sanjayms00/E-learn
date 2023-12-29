import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { InstructorModule } from './instructor/instructor.module';


@Module({
  imports: [
    StudentModule,
    AdminModule,
    InstructorModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
  providers: [JwtService],
})
export class AppModule { }
