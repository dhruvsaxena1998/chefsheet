import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSubCategoryDTO, QSParams, UpdateSubCategoryDTO } from './dto';
import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryRepository } from './sub-category.repository';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryRepository)
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  find(queryParams?: QSParams): Promise<SubCategoryEntity[]> {
    let whereClause = { deleted: false };

    if (queryParams) {
      whereClause = {
        ...whereClause,
        ...queryParams,
      };
    }

    return this.subCategoryRepository.find({
      loadRelationIds: true,
      where: whereClause,
    });
  }

  async findOne(id: string): Promise<SubCategoryEntity> {
    const entity = await this.subCategoryRepository.findOne(id, {
      loadRelationIds: true,
      where: { deleted: false },
    });

    if (!entity) throw new NotFoundException();

    return entity;
  }

  async findAllByCategory(category: string): Promise<SubCategoryEntity[]> {
    return this.subCategoryRepository.find({
      where: { category, deleted: false },
      select: ['id', 'name', 'code'],
    });
  }

  create(dto: AddSubCategoryDTO): SubCategoryEntity {
    return this.subCategoryRepository.create(dto);
  }

  async insert(dto: AddSubCategoryDTO): Promise<SubCategoryEntity> {
    const data = this.create(dto);
    return this.subCategoryRepository.save(data);
  }

  async update(id: string, dto: UpdateSubCategoryDTO): Promise<SubCategoryEntity> {
    let entity = await this.findOne(id);

    entity = {
      ...entity,
      name: dto.name || entity.name,
      code: dto.code || entity.code,
    };

    this.subCategoryRepository.update(id, entity);
    return entity;
  }

  async delete(id: string): Promise<SubCategoryEntity> {
    const entity = await this.findOne(id);
    this.subCategoryRepository.delete(entity.id);

    return entity;
  }

  count(queryParams?: QSParams): Promise<number> {
    let whereClause = { deleted: false };

    if (queryParams) {
      whereClause = {
        ...whereClause,
        ...queryParams,
      };
    }

    return this.subCategoryRepository.count({
      where: whereClause,
    });
  }
}
