import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { InstructorsController } from './controllers/instructors/instructors.controller';
import { AdminAuthController } from './controllers/admin_auth/admin_auth.controller';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constant/jwtConstant';
import { adminLocalStrategy } from './strategy/adminLocal.strategy';
import { adminJwtStrategy } from './strategy/adminJwt.strategy';
import { ClientModule } from 'src/client/client.module';

@Module({
  controllers: [
    StudentsController,
    InstructorsController,
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
  providers: [AdminAuthService, adminLocalStrategy, adminJwtStrategy],
  exports: [AdminAuthService]
})
export class AdminModule { }
