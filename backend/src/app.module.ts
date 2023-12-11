import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth_/auth.module';
// import { StudentModule } from './auth/student/student.module';
// import { ConfigModule } from '@nestjs/config';
// import { AdminModule } from './auth/admin/admin.module';

@Module({
  imports: [
    AuthModule
    // ConfigModule.forRoot({
    //   envFilePath: ".env",
    //   isGlobal: true
    // }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
