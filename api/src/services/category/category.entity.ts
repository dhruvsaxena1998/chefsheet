import { Column, Entity } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';

@Entity({
  name: 'categories',
})
export class CategoryEntity extends SharedEntity {
  @Column()
  name: string;

  @Column()
  code: string;
}
