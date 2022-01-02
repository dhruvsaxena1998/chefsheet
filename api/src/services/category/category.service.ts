import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
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
