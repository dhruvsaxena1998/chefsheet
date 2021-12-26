import { Entity, Column, ManyToOne } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';
import { CategoryEntity } from '../category';

@Entity({
  name: 'sub_category',
})
export class SubCategoryEntity extends SharedEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;
}
