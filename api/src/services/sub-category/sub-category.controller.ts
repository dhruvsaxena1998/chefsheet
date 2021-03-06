import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryService } from './sub-category.service';

import { CountResponse } from '../../shared/shared.types';
import { AddSubCategoryDTO, UpdateSubCategoryDTO, QSParams } from './dto';

export const SubCategoryRoute = 'sub-categories';
@ApiTags(SubCategoryRoute)
@Controller(SubCategoryRoute)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/')
  @ApiOperation({ summary: 'Return all sub-categories' })
  @ApiOkResponse({ status: 200, type: SubCategoryEntity, isArray: true })
  findAllSubCategories(@Query() queryParams?: QSParams): Promise<SubCategoryEntity[]> {
    return this.subCategoryService.find(queryParams);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Return count for sub-category' })
  @ApiOkResponse({ status: 200, type: CountResponse })
  async count(@Query() queryParams: QSParams): Promise<CountResponse> {
    const count = await this.subCategoryService.count(queryParams);
    return { count };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return sub-category by id' })
  @ApiOkResponse({ status: 200, type: SubCategoryEntity })
  findOneSubCategory(@Param('id') id: string): Promise<SubCategoryEntity> {
    return this.subCategoryService.findOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create sub-category' })
  @ApiCreatedResponse({ status: 201, type: SubCategoryEntity })
  createSubCategory(@Body() dto: AddSubCategoryDTO): Promise<SubCategoryEntity> {
    return this.subCategoryService.insert(dto);
  }

  @Post('/:category')
  @ApiOperation({ summary: 'Return all sub-category by category id' })
  @ApiOkResponse({ status: 200, type: SubCategoryEntity, isArray: true })
  findAllSubCategoryByCategory(@Param('category') category: string): Promise<SubCategoryEntity[]> {
    return this.subCategoryService.findAllByCategory(category);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update sub-category by id' })
  @ApiOkResponse({ status: 200, type: SubCategoryEntity })
  updateSubCategory(@Param('id') id: string, @Body() dto: UpdateSubCategoryDTO): Promise<SubCategoryEntity> {
    return this.subCategoryService.update(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete sub-category by id' })
  @ApiOkResponse({ status: 200, type: SubCategoryEntity })
  deleteSubCategory(@Param('id') id: string): Promise<SubCategoryEntity> {
    return this.subCategoryService.delete(id);
  }
}
