import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { AdminAuthController } from './controllers/admin_auth/admin_auth.controller';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { adminJwtStrategy } from './strategy/adminJwt.strategy';
import { ClientService } from './services/client/client.service';
import { adminSchema } from './schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [
    StudentsController,
    AdminAuthController,
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_ADMIN,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_ADMIN},
    }),
    MongooseModule.forFeature([{ name: 'Admin', schema: adminSchema }]),
  ],
  providers: [
    AdminAuthService, 
    adminJwtStrategy, 
    ClientService,
    JwtService
  ],
  exports: [
    AdminAuthService, 
    ClientService
  ]
})
export class AdminModule { }
