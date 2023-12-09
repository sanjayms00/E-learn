import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StudentService } from 'src/student/student.service';
import { studentSchema } from 'src/student/schemas/student.schema';
import { StudentController } from './student.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy : 'jwt'}),
    JwtModule.registerAsync({
      inject: [ConfigService],    //for using the process.env
      useFactory: (config: ConfigService)=>{
        return {
          secret: config.get('JWT_SECRET_CLIENT'),
          signOptions: {
            expiresIn : '1d'
          }
        }
      }
    }),
    MongooseModule.forFeature([{name: "Student", schema: studentSchema}])
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
