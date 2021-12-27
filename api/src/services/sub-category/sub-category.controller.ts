import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddSubCategoryDTO } from './dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.subCategoryService.findOne(id);
  }

  @Post('/:category')
  findAllByCategory(@Param('category') category: string) {
    return this.subCategoryService.findAllByCategory(category);
  }

  @Post()
  createSubCategory(@Body() dto: AddSubCategoryDTO) {
    return this.subCategoryService.create(dto);
  }
}
