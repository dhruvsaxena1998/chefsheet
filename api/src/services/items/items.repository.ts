import { EntityRepository, Repository } from 'typeorm';
import { ItemsEntity } from './items.entity';

@EntityRepository(ItemsEntity)
export class ItemsRepository extends Repository<ItemsEntity> {}
