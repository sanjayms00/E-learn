import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ClientAuthController } from './controllers/client_auth/client_auth.controller';
import { ClientAuthService } from './services/client-auth/client-auth.service';
import { ClientJwtStrategy } from './clientJwt.strategy';
import { clientSchema } from './schema/client.schema';
import { jwtConstants } from 'src/constant/jwtConstant';
import { ProfileController } from './controllers/profile/profile.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.ClientSecret,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
  ],
  controllers: [
    ClientAuthController,
    ProfileController
  ],
  providers: [ClientAuthService, ClientJwtStrategy, JwtService],
  exports: [ClientJwtStrategy, PassportModule],
})
export class ClientModule {}