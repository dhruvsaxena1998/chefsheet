import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

import { AddCategoryDTO, QSParams, UpdateCategoryDTO } from './dto';
import { CountResponse } from '../../shared/shared.types';

export const CategoryRoute = 'categories';
@ApiTags(CategoryRoute)
@Controller(CategoryRoute)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Return all categories' })
  @ApiOkResponse({ status: 200, type: CategoryEntity, isArray: true })
  findAllCategories(@Query() queryParams?: QSParams): Promise<CategoryEntity[]> {
    return this.categoryService.find(queryParams);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Return count for category' })
  @ApiOkResponse({ status: 200, type: CountResponse })
  async count(@Query() queryParams?: QSParams): Promise<CountResponse> {
    const count = await this.categoryService.count(queryParams);
    return { count };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return a category' })
  @ApiOkResponse({ status: 200, type: CategoryEntity })
  findOneCategory(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.findOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create category' })
  @ApiOkResponse({ status: 201, type: CategoryEntity })
  createCategory(@Body() dto: AddCategoryDTO): Promise<CategoryEntity> {
    return this.categoryService.insert(dto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update category by id' })
  @ApiOkResponse({ status: 200, type: CategoryEntity })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDTO): Promise<CategoryEntity> {
    return this.categoryService.update(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete sub-category by id' })
  @ApiOkResponse({ status: 200, type: CategoryEntity })
  deleteSubCategory(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoryService.delete(id);
  }
}
