import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral } from 'typeorm';
import { AddSubCategoryDTO, CountQSParams, UpdateSubCategoryDTO } from './dto';
import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryRepository } from './sub-category.repository';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryRepository)
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  find() {
    return this.subCategoryRepository.findAndCount();
  }

  async findOne(id: string): Promise<SubCategoryEntity> {
    const entity = await this.subCategoryRepository.findOne(id, {
      relations: ['category'],
      where: { deleted: false },
    });

    if (!entity) throw new NotFoundException();

    return entity;
  }

  // specific to sub-category
  findAllByCategory(category: string): Promise<SubCategoryEntity[]> {
    return this.subCategoryRepository.find({
      where: { category, deleted: false },
      select: ['id', 'name', 'code'],
    });
  }

  create(dto: AddSubCategoryDTO): Promise<SubCategoryEntity> {
    const categoryData = this.subCategoryRepository.create(dto);
    return this.subCategoryRepository.save(categoryData);
  }

  async update(
    id: string,
    dto: UpdateSubCategoryDTO,
  ): Promise<SubCategoryEntity> {
    let entity = await this.findOne(id);

    entity = {
      ...entity,
      name: dto.name || entity.name,
      code: dto.code || entity.code,
    };

    this.subCategoryRepository.update(id, entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    const entity = await this.findOne(id);
    this.subCategoryRepository.delete(entity.id);
  }

  count(queryParams: CountQSParams) {
    if (queryParams) {
      return this.subCategoryRepository.count({
        where: queryParams,
      });
    }

    return this.subCategoryRepository.count({
      where: { deleted: false },
    });
  }
}
