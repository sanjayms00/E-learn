import { Module } from '@nestjs/common';
import { AdminAuthController } from './controllers/admin_auth/admin_auth.controller';
import { AdminAuthService } from './services/admin-auth/admin-auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { adminJwtStrategy } from './strategy/adminJwt.strategy';
import { ClientService } from './services/client/client.service';
import { adminSchema } from './schema/admin.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminJwtAuthGuard } from './guards/adminJwtAuth.guard';
import { clientSchema } from 'src/client/schema/client.schema';
import { ClientManagementController } from './controllers/client-management/client-management.controller';

@Module({
  controllers: [
    AdminAuthController,
    ClientManagementController
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_ADMIN,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_ADMIN },
    }),
    MongooseModule.forFeature([{ name: 'Admin', schema: adminSchema }]),
    MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
  ],
  providers: [
    adminJwtStrategy,
    AdminAuthService,
    AdminJwtAuthGuard,
    ClientService,
    JwtService
  ],
  exports: [
    AdminAuthService,
    ClientService,
    AdminJwtAuthGuard
  ]
})
export class AdminModule { }
