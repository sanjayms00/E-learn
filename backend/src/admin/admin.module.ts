import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { adminSchema } from 'src/schemas/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([{name : "Admin", schema: adminSchema}])],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
