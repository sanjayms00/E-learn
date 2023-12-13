import { Module } from '@nestjs/common';
import { ClientService } from './services/client/client.service';
import { ClientAuthController } from './controllers/client_auth/client_auth.controller';
import { ClientAuthService } from './services/client-auth/client-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { clientSchema } from './schema/client.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ClientAuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],    //for using the process.env
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET_CLIENT'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRE_CLIENT')
          }
        }
      }
    }),
    MongooseModule.forFeature([{ name: "Admin", schema: clientSchema }]),
  ],
  providers: [
    ClientService, 
    ClientAuthService,
  ],
  exports: [],
})
export class ClientModule {}