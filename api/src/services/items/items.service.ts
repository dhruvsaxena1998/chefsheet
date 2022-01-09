import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddItemDTO, QSParams, UpdateItemDTO } from './dto';

import { ItemsEntity } from './items.entity';
import { ItemsRepository } from './items.repository';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(ItemsRepository)
    private readonly itemsRepository: ItemsRepository,
  ) {}

  find(queryParams?: QSParams): Promise<ItemsEntity[]> {
    let whereClause = { deleted: false };

    if (queryParams) {
      whereClause = {
        ...whereClause,
        ...queryParams,
      };
    }

    return this.itemsRepository.find({
      loadRelationIds: true,
      where: whereClause,
    });
  }

  async findOne(id: string): Promise<ItemsEntity> {
    const entity = await this.itemsRepository.findOne(id, {
      loadRelationIds: true,
      where: { deleted: false },
    });

    if (!entity) throw new NotFoundException();

    return entity;
  }

  create(dto: AddItemDTO): ItemsEntity {
    return this.itemsRepository.create(dto);
  }

  async insert(dto: AddItemDTO): Promise<ItemsEntity> {
    const data = this.create(dto);
    return this.itemsRepository.save(data);
  }

  async update(id: string, dto: UpdateItemDTO): Promise<ItemsEntity> {
    let entity = await this.findOne(id);
    entity = this.itemsRepository.merge(entity, dto);
    this.itemsRepository.update(id, entity);
    return entity;
  }

  async delete(id: string): Promise<ItemsEntity> {
    const entity = await this.findOne(id);
    this.itemsRepository.delete(id);
    return entity;
  }

  count(queryParams: QSParams): Promise<number> {
    let whereClause = { deleted: false };

    if (queryParams) {
      whereClause = {
        ...whereClause,
        ...queryParams,
      };
    }

    return this.itemsRepository.count({
      where: whereClause,
    });
  }
}
