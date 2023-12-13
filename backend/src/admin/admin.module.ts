import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { AdminAuthController } from './controllers/admin_auth/admin_auth.controller';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/jwtConstant';
import { adminLocalStrategy } from './strategy/adminLocal.strategy';
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
      secret: jwtConstants.AdminSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AdminAuthService, adminLocalStrategy, adminJwtStrategy, ClientService, JwtService],
  exports: [AdminAuthService, ClientService]
})
export class AdminModule { }
