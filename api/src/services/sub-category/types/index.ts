import { ApiProperty } from '@nestjs/swagger';
import { SubCategoryEntity } from '../sub-category.entity';

export class CountSubCategoryResponse {
  @ApiProperty()
  count: number;
}

type FindAllSubCategoryEntities = Omit<SubCategoryEntity, 'category'>;
export class FindAllSubCategoryResponse {
  @ApiProperty({
    type: SubCategoryEntity,
    isArray: true,
  })
  entities: FindAllSubCategoryEntities[];

  @ApiProperty()
  count: number;
}
