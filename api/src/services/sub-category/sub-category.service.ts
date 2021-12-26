import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddSubCategoryDTO } from './dto';
import { SubCategoryEntity } from './sub-category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryEntity)
    private readonly subCategoryRepository: Repository<SubCategoryEntity>,
  ) {}

  findAllByCategory(category: string) {
    return this.subCategoryRepository.find({
      where: { category, deleted: false },
      select: ['id', 'name', 'code'],
    });
  }

  findOne(id: string) {
    return this.subCategoryRepository.findOne(id, {
      relations: ['category'],
      where: { deleted: false },
    });
  }

  create(dto: AddSubCategoryDTO) {
    const categoryData = this.subCategoryRepository.create(dto);
    return this.subCategoryRepository.save(categoryData);
  }
}
