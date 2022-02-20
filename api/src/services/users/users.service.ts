import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUserByIdentifier } from './dto';

import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async find(dto: GetUserByIdentifier): Promise<UsersEntity> {
    const [user] = await this.usersRepository.find({
      where: [{ username: dto.identifier }, { email: dto.identifier }],
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  toJSON(user: UsersEntity): Partial<UsersEntity> {
    return this.usersRepository.sanitize(user);
  }
}
