import { Module } from '@nestjs/common';
// import { AdminAuthService } from './admin/services/admin-auth/admin-auth.service';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { ClientAuthService } from './client/services/client-auth/client-auth.service';
// import { ClientService } from './admin/services/client/client.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ClientModule,
    AdminModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI)
  ],
  providers: [JwtService],
})
export class AppModule { }
