import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 91, required: false })
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
}
