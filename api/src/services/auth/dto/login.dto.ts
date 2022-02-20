import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  password: string;
}
