import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubCategoryDTO {
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  code?: string;
}
