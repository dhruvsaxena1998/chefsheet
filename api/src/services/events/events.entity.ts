import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({
  name: 'events',
})
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'datetime',
    name: 'start_date',
  })
  startDate: Date;

  @Column({ type: 'datetime', name: 'end_date' })
  endDate: Date;

  @Column()
  duration: number;

  @Column({ name: 'organized_by' })
  organizedBy: string;

  @Column({ type: 'text' })
  location: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // assignedTo: relation to user
  // inventory: relation to inventory
  // staffMembers: relation to staffMembers
}
