import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO, GetUserByIdentifier } from './dto';

import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async find(dto: GetUserByIdentifier): Promise<UsersEntity> {
    const whereClause = [{ username: dto.identifier }, { email: dto.identifier }];

    if (dto.email) {
      whereClause.push({ email: dto.email });
    }

    const [user] = await this.usersRepository.find({
      where: whereClause,
    });

    if (!user) throw new NotFoundException();

    return user;
  }

  async countWithIdentifier(dto: GetUserByIdentifier): Promise<number> {
    const whereClause = [{ username: dto.identifier }, { email: dto.identifier }];

    if (dto.email) {
      whereClause.push({ email: dto.email });
    }

    return this.usersRepository.count({ where: whereClause });
  }

  create(dto: CreateUserDTO): UsersEntity {
    return this.usersRepository.create(dto);
  }

  async insert(user: UsersEntity): Promise<UsersEntity> {
    return this.usersRepository.save(user);
  }

  toJSON(user: UsersEntity): Partial<UsersEntity> {
    return this.usersRepository.sanitize(user);
  }
}
