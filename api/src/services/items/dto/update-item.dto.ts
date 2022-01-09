import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CategoryEntity } from 'src/services/category';
import { SubCategoryEntity } from 'src/services/sub-category';
import { DeepPartial } from 'typeorm';

export class UpdateItemDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  @IsOptional()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  expiration: Date;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  @IsOptional()
  quantity: number;

  @ApiProperty({
    type: 'string',
    description: 'Category ID',
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  category: DeepPartial<CategoryEntity>;

  @ApiProperty({
    type: 'string',
    description: 'SubCategory ID',
    default: '',
  })
  @IsNotEmpty()
  @IsOptional()
  subCategory: DeepPartial<SubCategoryEntity>;
}
