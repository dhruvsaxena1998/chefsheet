import { ApiProperty } from '@nestjs/swagger';
import { SubCategoryEntity } from '../sub-category.entity';

export class CountSubCategoryResponse {
  @ApiProperty()
  count: number;
}

export class FindAllSubCategoryResponse {
  @ApiProperty({
    type: SubCategoryEntity,
    isArray: true,
  })
  entities: SubCategoryEntity[];

  @ApiProperty()
  count: number;
}
