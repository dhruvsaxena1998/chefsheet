import { Column, Entity, JoinTable, OneToMany } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SubCategoryEntity } from '../sub-category';

export const CategoryTableName = 'categories';
@Entity({ name: CategoryTableName })
export class CategoryEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  code: string;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  @JoinTable()
  subCategories: SubCategoryEntity[];
}
