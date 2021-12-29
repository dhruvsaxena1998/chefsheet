import { Entity, Column, ManyToOne } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';
import { CategoryEntity } from '../category';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'sub_category',
})
export class SubCategoryEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty()
  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;
}
