import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  create(
    @Body('name') name: string,
    @Body('code') code: string,
    @Body('parentId') parentId?: string,
  ) {
    return this.categoryService.create(name, code, parentId);
  }
}
