import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
import { StudentService } from './student.service';
import { studentSchema } from './schemas/student.schema';
import { StudentController } from './student.controller';
// import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/constant/jwtConstant';

@Module({ 
  imports: [
    // PassportModule.register({defaultStrategy: 'JWT'}),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService)=>{
    //     return {
    //       secret: config.get('JWT_SECRET_CLIENT'),
    //       signOptions: config.get('JWT_SECRET_CLIENT')
    //     }
    //   }
    // }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forFeature([{name: "Student", schema: studentSchema}])
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
