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
import { studentSchema } from 'src/student/schema/student.schema';
import { ClientManagementController } from './controllers/client-management/client-management.controller';
import { instructorSchema } from 'src/instructor/schema/instructor.schema';
import { CategorySchema } from './schema/category.schema';
import { CategoryController } from './controllers/category/category.controller';
import { CategoryService } from './services/category/category.service';

@Module({
  controllers: [
    AdminAuthController,
    ClientManagementController,
    CategoryController
  ],
  imports: [
    PassportModule.register({ defaultStrategy: 'admin-jwt' }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_ADMIN,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_ADMIN },
    }),
    MongooseModule.forFeature([{ name: 'Admin', schema: adminSchema }]),
    MongooseModule.forFeature([{ name: 'Student', schema: studentSchema }]),
    MongooseModule.forFeature([{ name: 'Instructor', schema: instructorSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  providers: [
    adminJwtStrategy,
    AdminAuthService,
    AdminJwtAuthGuard,
    ClientService,
    CategoryService,
    JwtService
  ],
  exports: [
    AdminAuthService,
    ClientService,
    AdminJwtAuthGuard
  ]
})
export class AdminModule { }
