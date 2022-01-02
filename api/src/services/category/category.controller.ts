import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from '.';
import { CategoryService } from './category.service';

export const CategoryRoute = 'categories';
@ApiTags(CategoryRoute)
@Controller(CategoryRoute)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Return all categories' })
  @ApiOkResponse({ status: 200, type: CategoryEntity, isArray: true })
  findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  create(@Body('name') name: string, @Body('code') code: string, @Body('parentId') parentId?: string) {
    return this.categoryService.create(name, code, parentId);
  }
}
