import { SharedEntity } from 'src/shared/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends SharedEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', default: false })
  blocked: boolean;

  @Column({ type: 'boolean', default: false })
  confirmed: boolean;

  @Column({ name: 'contact_no', type: 'text', nullable: true })
  contactNo: string;

  @Column({
    name: 'country_code',
    nullable: true,
    type: 'smallint',
    default: 91,
  })
  countryCode: number;

  @Column({ type: 'text', nullable: true, name: 'reset_password_token' })
  resetPasswordToken: string;
}
