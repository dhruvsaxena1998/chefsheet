import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users';
import { LoginDTO } from './dto';

import { ErrorSlugs } from '../../shared/error-codes';
import { RegisterDTO } from './dto/register.dto';
import { CreateUserDTO } from '../users/dto';

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

  async createUser(dto: RegisterDTO, role: 'manager' | 'admin' | 'superadmin' = 'manager') {
    const { username, email } = dto;
    // check if user already exists
    const userCount = await this.usersService.countWithIdentifier({
      identifier: username,
      email,
    });

    if (userCount > 0) {
      throw new ForbiddenException({
        message: 'User already exists',
        slug: ErrorSlugs.userAlreadyExists,
      });
    }

    // hash password
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    // create user
    const userDTO: CreateUserDTO = { ...dto, role, verified: true, password };
    const user = this.usersService.create(userDTO);

    // insert user
    await this.usersService.insert(user);

    // generate jwt token
    const token = this.jwt.sign({ userId: user.id, username: user.username });

    return {
      token,
      user: this.usersService.toJSON(user),
    };
  }

  async register(dto: RegisterDTO) {
    return this.createUser(dto);
  }

  async registerAsAdmin(dto: RegisterDTO) {
    return this.createUser(dto, 'admin');
  }

  async registerAsSuperAdmin(dto: RegisterDTO) {
    return this.createUser(dto, 'superadmin');
  }
}
