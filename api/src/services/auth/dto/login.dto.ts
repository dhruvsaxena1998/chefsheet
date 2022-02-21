import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ default: '', required: false })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  password: string;
}
