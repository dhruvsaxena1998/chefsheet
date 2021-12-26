import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserDTO } from './dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  addUser(dto: AddUserDTO): Promise<UserEntity> {
    const user: Partial<UserEntity> = {
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      contactNo: dto?.contactNo || '',
      countryCode: dto?.countryCode || 91,
    };

    const userData = this.userRepository.create(user);
    return this.userRepository.save(userData);
  }
}
