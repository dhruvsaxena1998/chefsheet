import { ApiProperty } from '@nestjs/swagger';

export class CountSubCategoryResponse {
  @ApiProperty()
  count: number;
}