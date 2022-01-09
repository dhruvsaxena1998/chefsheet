import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubCategoryDTO {
  @ApiProperty({ required: false, default: '' })
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, default: '' })
  @IsNotEmpty()
  @IsOptional()
  code?: string;
}
