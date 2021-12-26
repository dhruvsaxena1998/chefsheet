import { SharedEntity } from 'src/shared/shared.entity';
import { Entity, Column } from 'typeorm';

@Entity({
  name: 'events',
})
export class EventsEntity extends SharedEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'start_date',
    type: 'datetime',
  })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime' })
  endDate: Date;

  @Column()
  duration: number;

  @Column({ name: 'organized_by' })
  organizedBy: string;

  @Column({ type: 'text' })
  location: string;

  //TODO: assignedTo: relation to user
  //TODO: inventory: relation to inventory
  //TODO: staffMembers: relation to staffMembers
}
