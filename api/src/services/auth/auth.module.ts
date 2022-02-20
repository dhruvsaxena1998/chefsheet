import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users';
import { environment } from '../../config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

const jwtOptions: JwtModuleOptions = {
  secret: environment.jwt.secret,
  signOptions: {
    expiresIn: environment.jwt.expiresIn,
    issuer: 'chefsheet',
  },
};

@Module({
  imports: [UsersModule, JwtModule.register(jwtOptions)],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
