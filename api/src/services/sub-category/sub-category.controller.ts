import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubCategoryService } from './sub-category.service';
import { CountSubCategoryResponse, FindAllSubCategoryResponse } from './types';
import { AddSubCategoryDTO, UpdateSubCategoryDTO, CountQSParams } from './dto';

const SubCategoryRoute = 'sub-category';
@Controller(SubCategoryRoute)
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/')
  @ApiTags(SubCategoryRoute)
  @ApiOperation({ summary: 'Return all sub-categories' })
  @ApiOkResponse({ type: FindAllSubCategoryResponse })
  async findAllSubCategories(): Promise<FindAllSubCategoryResponse> {
    const [entities, count] = await this.subCategoryService.find();
    return { entities, count };
  }

  @Post('/')
  @ApiTags(SubCategoryRoute)
  @ApiOperation({ summary: 'Create sub-category' })
  createSubCategory(@Body() dto: AddSubCategoryDTO) {
    return this.subCategoryService.create(dto);
  }

  @Get('/count')
  @ApiTags(SubCategoryRoute)
  @ApiOperation({ summary: 'Return count for sub-category' })
  @ApiOkResponse({ status: 200, type: CountSubCategoryResponse })
  async count(
    @Query() queryParams: CountQSParams,
  ): Promise<CountSubCategoryResponse> {
    const count = await this.subCategoryService.count(queryParams);
    return { count };
  }

  @Get('/:id')
  @ApiTags(SubCategoryRoute)
  @ApiOperation({ summary: 'Return sub-category by id' })
  async findOneSubCategory(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Post('/:category')
  @ApiTags(SubCategoryRoute)
  findAllSubCategoryByCategory(@Param('category') category: string) {
    return this.subCategoryService.findAllByCategory(category);
  }

  @Put('/:id')
  @ApiTags(SubCategoryRoute)
  updateSubCategory(
    @Param('id') id: string,
    @Body() dto: UpdateSubCategoryDTO,
  ) {
    return this.subCategoryService.update(id, dto);
  }

  @Delete('/:id')
  @ApiTags(SubCategoryRoute)
  deleteSubCategory(@Param('id') id: string) {
    return this.subCategoryService.delete(id);
  }
}
