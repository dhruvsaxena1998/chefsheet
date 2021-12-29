import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddSubCategoryDTO, UpdateSubCategoryDTO } from './dto';
import { SubCategoryService } from './sub-category.service';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Get('/count')
  count() {
    return this.subCategoryService.count();
  }

  @Get('/')
  async findAllSubCategories() {
    const [entities, count] = await this.subCategoryService.find();
    return { entities, count };
  }

  @Get('/:id')
  async findOneSubCategory(@Param('id') id: string) {
    return this.subCategoryService.findOne(id);
  }

  @Post('/:category')
  findAllSubCategoryByCategory(@Param('category') category: string) {
    return this.subCategoryService.findAllByCategory(category);
  }

  @Post()
  createSubCategory(@Body() dto: AddSubCategoryDTO) {
    return this.subCategoryService.create(dto);
  }

  @Put('/:id')
  updateSubCategory(
    @Param('id') id: string,
    @Body() dto: UpdateSubCategoryDTO,
  ) {
    return this.subCategoryService.update(id, dto);
  }

  @Delete('/:id')
  deleteSubCategory(@Param('id') id: string) {
    return this.subCategoryService.delete(id);
  }
}
