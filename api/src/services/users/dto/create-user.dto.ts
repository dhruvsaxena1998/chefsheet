import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'manager' })
  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  @IsOptional()
  country_code: number;

  @ApiProperty({ default: '', required: false })
  @IsNotEmpty()
  @IsOptional()
  phone_number: string;

  @ApiProperty({ default: '', required: false })
  @IsNotEmpty()
  @IsOptional()
  avatar: string;

  @ApiProperty({ default: true })
  @IsNotEmpty()
  @IsOptional()
  verified: boolean;
}
