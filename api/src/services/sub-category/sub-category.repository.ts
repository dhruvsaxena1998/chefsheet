import { EntityRepository, Repository } from 'typeorm';
import { SubCategoryEntity } from './sub-category.entity';

@EntityRepository(SubCategoryEntity)
export class SubCategoryRepository extends Repository<SubCategoryEntity> {}
