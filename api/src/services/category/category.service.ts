import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  create(name: string, code: string, parentId?: string) {
    const category = {
      name,
      code,
    };

    if (parentId) {
      category['parent'] = parentId;
    }

    const categoryData = this.categoryRepository.create(category);
    return this.categoryRepository.save(categoryData);
  }
}
