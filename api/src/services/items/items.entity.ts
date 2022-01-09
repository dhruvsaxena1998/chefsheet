import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from 'src/shared/shared.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import { CategoryEntity } from '../category';
import { SubCategoryEntity } from '../sub-category';

@Entity({ name: 'items' })
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
