import { Column, Entity } from 'typeorm';
import { SharedEntity } from 'src/shared/shared.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'categories',
})
export class CategoryEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  code: string;
}
