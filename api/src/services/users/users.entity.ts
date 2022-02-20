import { ApiProperty } from '@nestjs/swagger';
import { SharedEntity } from '../../shared/shared.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

export const UsersTableName = 'users';

@Entity({ name: UsersTableName })
export class UsersEntity extends SharedEntity {
  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  role: string;

  @ApiProperty()
  @Column({ name: 'country_code', default: 91 })
  countryCode: number;

  @ApiProperty()
  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty()
  @Column({ default: false })
  blocked: boolean;

  @ApiProperty()
  @Column({ default: true })
  verified: boolean;

  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;
}
