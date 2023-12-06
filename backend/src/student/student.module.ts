import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentService } from './student.service';
import { studentSchema } from 'src/schemas/student.schema';
import { StudentController } from './student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{name: "Student", schema: studentSchema}])
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
