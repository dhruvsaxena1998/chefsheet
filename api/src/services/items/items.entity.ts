import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from '../../shared/shared.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CategoryEntity } from '../category';
import { SubCategoryEntity } from '../sub-category';

export const ItemsTableName = 'items'
@Entity({ name: ItemsTableName })
export class ItemsEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  code: string;

  @ApiProperty()
  @Column({ type: 'datetime' })
  expiration: Date;

  @ApiProperty()
  @Column()
  quantity: number;

  @ApiProperty({ type: 'string' })
  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ApiProperty({ type: 'string' })
  @ManyToOne(() => SubCategoryEntity)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategoryEntity;
}
