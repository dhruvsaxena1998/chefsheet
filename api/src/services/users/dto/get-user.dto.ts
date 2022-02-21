import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class GetUserByIdentifier {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ default: '', required: false })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
