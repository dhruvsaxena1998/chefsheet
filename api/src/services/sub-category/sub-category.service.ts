import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSubCategoryDTO, UpdateSubCategoryDTO } from './dto';
import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryRepository } from './sub-category.repository';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryRepository)
    private readonly subCategoryRepository: SubCategoryRepository,
  ) {}

  findAllByCategory(category: string): Promise<SubCategoryEntity[]> {
    return this.subCategoryRepository.find({
      where: { category, deleted: false },
      select: ['id', 'name', 'code'],
    });
  }

  async findOne(id: string): Promise<SubCategoryEntity> {
    const entity = await this.subCategoryRepository.findOne(id, {
      relations: ['category'],
      where: { deleted: false },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  create(dto: AddSubCategoryDTO): Promise<SubCategoryEntity> {
    const categoryData = this.subCategoryRepository.create(dto);
    return this.subCategoryRepository.save(categoryData);
  }

  async update(id: string, dto: UpdateSubCategoryDTO) {
    const entity = await this.findOne(id);

    entity.name = dto.name || entity.name;
    entity.code = dto.code || entity.code;

    return this.subCategoryRepository.update(id, entity);
  }
}
