import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { AdminAuthController } from './controllers/admin_auth/admin_auth.controller';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { adminLocalStrategy } from './strategy/adminLocal.strategy';
import { adminJwtStrategy } from './strategy/adminJwt.strategy';
import { ClientModule } from 'src/client/client.module';
import { ClientService } from './services/client/client.service';

@Module({
  controllers: [
    StudentsController,
    AdminAuthController,
  ],
  imports: [
    PassportModule,
    ClientModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_ADMIN,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_ADMIN },
    }),
  ],
  providers: [AdminAuthService, adminJwtStrategy, ClientService],
  exports: [AdminAuthService, ClientService]
})
export class AdminModule { }
