import { IsNotEmpty } from 'class-validator';
import { CategoryEntity } from 'src/services/category';
import { DeepPartial } from 'typeorm';

export class AddSubCategoryDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  category: DeepPartial<CategoryEntity>;
}
