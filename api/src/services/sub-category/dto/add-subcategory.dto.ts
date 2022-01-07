import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/services/category';
import { DeepPartial } from 'typeorm';

export class AddSubCategoryDTO {
  @ApiProperty({ default: '' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: '' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: 'string',
    description: 'Category ID',
    default: '',
  })
  @IsNotEmpty()
  category: DeepPartial<CategoryEntity>;
}
