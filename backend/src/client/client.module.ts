import { Module } from '@nestjs/common';
import { ClientAuthController } from './controllers/client_auth/client_auth.controller';
import { ProfileController } from './controllers/profile/profile.controller';
import { ClientAuthService } from './services/client-auth/client-auth.service';

@Module({
  providers: [ClientAuthService, ClientAuthService],
  controllers: [ClientAuthController, ProfileController],
  exports: [ClientAuthService],
})
export class ClientModule { }
