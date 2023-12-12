import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
// import { StudentModule } from './auth/student/student.module';
// import { ConfigModule } from '@nestjs/config';
// import { AdminModule } from './auth/admin/admin.module';
import { AdminAuthService } from './admin/services/admin-auth/admin-auth.service';
import { ClientModule } from './client/client.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AdminModule,
    ClientModule
    // ConfigModule.forRoot({
    //   envFilePath: ".env",
    //   isGlobal: true
    // }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  providers: [AdminAuthService, JwtService],
})
export class AppModule { }
