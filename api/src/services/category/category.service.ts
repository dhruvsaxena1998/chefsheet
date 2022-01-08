import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryEntity } from './category.entity';
import { CategoryRepository } from './category.repository';

import { AddCategoryDTO, QSParams, UpdateCategoryDTO } from './dto';
import {} from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  find(queryParams?: QSParams): Promise<CategoryEntity[]> {
    if (queryParams) {
      return this.categoryRepository.find({
        where: { deleted: false, ...queryParams },
      });
    }

    return this.categoryRepository.find({
      where: { deleted: false },
    });
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const entity = await this.categoryRepository.findOne(id, {
      where: { deleted: false },
    });

    if (!entity) throw new NotFoundException();
    return entity;
  }

  create(dto: AddCategoryDTO): CategoryEntity {
    return this.categoryRepository.create(dto);
  }

  async insert(dto: AddCategoryDTO): Promise<CategoryEntity> {
    const data = this.create(dto);
    return this.categoryRepository.save(data);
  }

  async update(id: string, dto: UpdateCategoryDTO): Promise<CategoryEntity> {
    let entity = await this.findOne(id);

    entity = {
      ...entity,
      name: dto.name || entity.name,
      code: dto.code || entity.code,
    };

    this.categoryRepository.update(id, entity);
    return entity;
  }

  async delete(id: string): Promise<CategoryEntity> {
    const entity = await this.findOne(id);
    this.categoryRepository.delete(entity.id);

    return entity;
  }

  count(queryParams?: QSParams): Promise<number> {
    if (queryParams) {
      return this.categoryRepository.count({
        deleted: false,
        ...queryParams,
      });
    }

    return this.categoryRepository.count({
      where: { deleted: false },
    });
  }
}
