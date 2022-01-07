import { ApiProperty } from '@nestjs/swagger';

export class CountCategoryResponse {
  @ApiProperty()
  count: number;
}