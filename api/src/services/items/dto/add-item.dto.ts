import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/services/category';
import { SubCategoryEntity } from 'src/services/sub-category';
import { DeepPartial } from 'typeorm';

export class AddItemDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  expiration: Date;

  @ApiProperty({ default: 0 })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    type: 'string',
    description: 'Category ID',
    default: '',
  })
  @IsNotEmpty()
  category: DeepPartial<CategoryEntity>;

  @ApiProperty({
    type: 'string',
    description: 'SubCategory ID',
    default: '',
  })
  @IsNotEmpty()
  subCategory: DeepPartial<SubCategoryEntity>;
}
