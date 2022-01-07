import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: '' })
  code: string;
}
