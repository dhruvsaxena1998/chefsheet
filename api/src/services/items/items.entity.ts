import { SharedEntity } from 'src/shared/shared.entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'items' })
export class ItemsEntity extends SharedEntity {
  @Column()
  name: string;

  @Column()
  code: string;

  //TODO: category code

  @Column({ type: 'datetime' })
  expiration: Date;

  @Column()
  quantity: number;
}
