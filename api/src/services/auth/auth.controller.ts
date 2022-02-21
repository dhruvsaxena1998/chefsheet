import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { RegisterDTO } from './dto/register.dto';

export const AuthRoute = 'auth';

@ApiTags(AuthRoute)
@Controller(AuthRoute)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ status: 200, description: 'Success' })
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({ status: 201, description: 'Success' })
  register(@Body() dto: RegisterDTO) {
    return this.authService.register(dto);
  }

  @Post('/register/admin')
  @ApiOperation({ summary: 'Register admin' })
  @ApiCreatedResponse({ status: 201, description: 'Success' })
  registerAdmin(@Body() dto: RegisterDTO) {
    return this.authService.registerAsAdmin(dto);
  }

  @Post('/register/superadmin')
  @ApiOperation({ summary: 'Register superadmin' })
  @ApiCreatedResponse({ status: 201, description: 'Success' })
  registerSuperAdmin(@Body() dto: RegisterDTO) {
    return this.authService.registerAsSuperAdmin(dto);
  }
}
