import { EntityRepository, Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

import { omit } from 'lodash';

@EntityRepository(UsersEntity)
export class UsersRepository extends Repository<UsersEntity> {
  sanitize(user: UsersEntity): Partial<UsersEntity> {
    const privateFields: Array<keyof UsersEntity> = ['password', 'resetPasswordToken'];

    return omit(user, privateFields);
  }
}
