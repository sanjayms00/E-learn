import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ClientAuthController } from './controllers/client_auth/client_auth.controller';
import { ClientAuthService } from './services/client-auth/client-auth.service';
import { ClientJwtStrategy } from './clientJwt.strategy';
import { clientSchema } from './schema/client.schema';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Client', schema: clientSchema }]),
  ],
  controllers: [ClientAuthController],
  providers: [ClientAuthService, ClientJwtStrategy, JwtService],
  exports: [ClientJwtStrategy, PassportModule, ClientAuthService],
})
export class ClientModule {}