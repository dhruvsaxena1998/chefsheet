import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';

import { CategoryEntity } from '../category';

export const SubCategoryTableName = 'sub_categories';
@Entity({ name: SubCategoryTableName })
export class SubCategoryEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  code: string;
 
  @ApiProperty({
    type: 'string',
  })
  @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
