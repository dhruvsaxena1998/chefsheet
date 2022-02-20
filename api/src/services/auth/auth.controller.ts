import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

export const AuthRoute = 'users';

@ApiTags(AuthRoute)
@Controller(AuthRoute)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
}
