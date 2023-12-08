import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from './schemas/admin.schema';
// import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt/dist';
// import { ConfigService } from '@nestjs/config';
import { jwtConstants } from 'src/constant/jwtConstant';
import { StudentService } from 'src/student/student.service';
import { studentSchema } from 'src/student/schemas/student.schema';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy : 'JWT'}),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],    //for using the process.env
    //   useFactory: (config: ConfigService)=>{
    //     return {
    //       secret: config.get('JWT_SECRET_ADMIN'),
    //       signOptions: config.get('JWT_EXPIRE_ADMIN')
    //     }
    //   }
    // }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forFeature([{name : "Admin", schema: adminSchema}]),
    MongooseModule.forFeature([{name: "Student", schema: studentSchema}])
  ],
  controllers: [AdminController],
  providers: [AdminService, StudentService]
})
export class AdminModule {}
