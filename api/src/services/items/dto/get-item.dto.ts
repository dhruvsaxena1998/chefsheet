import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class QSParams {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  code: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  category: string;

  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsOptional()
  subCategory: string;
}
