import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountResponse } from '../../shared/shared.types';

import { UsersService } from './users.service';

export const UsersRoute = 'users';

@ApiTags(UsersRoute)
@Controller(UsersRoute)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
