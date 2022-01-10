import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountResponse } from '../../shared/shared.types';

import { AddItemDTO, QSParams, UpdateItemDTO } from './dto';
import { ItemsEntity } from './items.entity';
import { ItemsService } from './items.service';

export const ItemsRoute = 'items';
@ApiTags(ItemsRoute)
@Controller(ItemsRoute)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Return all items' })
  @ApiOkResponse({ status: 200, type: ItemsEntity, isArray: true })
  findAllItems(@Query() queryParams?: QSParams): Promise<ItemsEntity[]> {
    return this.itemsService.find(queryParams);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Return the number of items' })
  @ApiOkResponse({ status: 200, type: CountResponse })
  async count(@Query() queryParams?: QSParams): Promise<CountResponse> {
    const count = await this.itemsService.count(queryParams);
    return { count };
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return item by id' })
  @ApiOkResponse({ status: 200, type: ItemsEntity })
  findOneItem(@Param('id') id: string): Promise<ItemsEntity> {
    return this.itemsService.findOne(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create item' })
  @ApiOkResponse({ status: 201, type: ItemsEntity })
  createItem(@Body() dto: AddItemDTO): Promise<ItemsEntity> {
    return this.itemsService.insert(dto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update item by id' })
  @ApiOkResponse({ status: 200, type: ItemsEntity })
  updateItem(@Param('id') id: string, @Body() dto: UpdateItemDTO): Promise<ItemsEntity> {
    return this.itemsService.update(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete item by id' })
  @ApiOkResponse({ status: 200, type: ItemsEntity })
  deleteItem(@Param('id') id: string): Promise<ItemsEntity> {
    return this.itemsService.delete(id);
  }
}
