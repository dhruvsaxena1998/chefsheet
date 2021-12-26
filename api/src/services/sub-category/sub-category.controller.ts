import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { AddSubCategoryDTO } from './dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const entity = await this.subCategoryService.findOne(id);

    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
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
