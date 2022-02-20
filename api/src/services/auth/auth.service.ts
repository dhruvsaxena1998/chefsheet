import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users';
import { LoginDTO } from './dto';

import { ErrorSlugs } from '../../shared/error-codes';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwt: JwtService) {}

  async login(dto: LoginDTO) {
    const user = await this.usersService.find(dto);

    // check if user is blocked
    if (user.blocked) {
      throw new ForbiddenException({
        message: 'User is blocked',
        slug: ErrorSlugs.userBlocked,
      });
    }

    // check if user is verified
    if (!user.verified) {
      throw new ForbiddenException({
        message: 'User is not verified',
        slug: ErrorSlugs.userNotVerified,
      });
    }

    // check if user's password is correct
    const isValidPassword = await bcrypt.compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        message: 'Credentials are invalid',
        slug: ErrorSlugs.invalidCredentials,
      });
    }

    // generate jwt token
    const token = this.jwt.sign({ userId: user.id, username: user.username });

    return {
      token,
      user: this.usersService.toJSON(user),
    };
  }
}
