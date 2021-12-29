import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/services/category';
import { DeepPartial } from 'typeorm';

export class AddSubCategoryDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    type: 'string',
    description: 'Category ID',
  })
  @IsNotEmpty()
  category: DeepPartial<CategoryEntity>;
}
