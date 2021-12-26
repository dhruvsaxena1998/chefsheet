import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from '.';
import { AddUserDTO } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  find(): Promise<UserEntity[]> {
    return this.usersService.findAllUsers();
  }

  @Post()
  create(@Body() dto: AddUserDTO): Promise<UserEntity> {
    return this.usersService.addUser(dto);
  }
}
