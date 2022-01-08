import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsOptional()
  code?: string;
}
