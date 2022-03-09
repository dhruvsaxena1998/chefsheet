import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AddSubCategoryDTO, QSParams, UpdateSubCategoryDTO } from './dto';

import { SubCategoryEntity } from './sub-category.entity';
import { SubCategoryRepository } from './sub-category.repository';

import { slugify } from '../../utils/slugify';
import { merge } from 'lodash';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategoryRepository)
    private readonly subCategoryRepository: SubCategoryRepository,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  find(queryParams?: QSParams): Promise<SubCategoryEntity[]> {
    let whereClause = { 'sub_categories.deleted': false };

    const query = this.knex
      .table('sub_categories')
      .select(['sub_categories.id', 'sub_categories.name', 'sub_categories.code', 'categories.name as category'])
      .where(whereClause)
      .leftJoin('categories', 'sub_categories.category_id', 'categories.id');

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        query.whereILike(`sub_categories.${key}`, `%${value}%`);
      });
    }

    return query as unknown as Promise<SubCategoryEntity[]>;
  }

  async findOne(id: string): Promise<SubCategoryEntity> {
    const entity = await this.knex
      .table('sub_categories')
      .select(['sub_categories.id', 'sub_categories.name', 'sub_categories.code', 'categories.name as category'])
      .where({ 'sub_categories.deleted': false, 'sub_categories.id': id })
      .leftJoin('categories', 'sub_categories.category_id', 'categories.id')
      .first();

    if (!entity) throw new NotFoundException();

    return entity as unknown as Promise<SubCategoryEntity>;
  }

  async findAllByCategory(category: string): Promise<SubCategoryEntity[]> {
    return this.subCategoryRepository.find({
      where: { category, deleted: false },
      select: ['id', 'name', 'code'],
    });
  }

  create(dto: AddSubCategoryDTO): SubCategoryEntity {
    const data: AddSubCategoryDTO = {
      name: dto.name,
      category: dto.category,
      code: slugify(dto.name),
    };
    return this.subCategoryRepository.create(data);
  }

  async insert(dto: AddSubCategoryDTO): Promise<SubCategoryEntity> {
    const data = this.create(dto);
    return this.subCategoryRepository.save(data);
  }

  async update(id: string, dto: UpdateSubCategoryDTO): Promise<SubCategoryEntity> {
    const entity = await this.findOne(id);

    if (!entity) throw new BadRequestException();

    await this.knex.update(dto).table('sub_categories').where({ id });
    return merge({}, entity, dto);
  }

  async delete(id: string): Promise<SubCategoryEntity> {
    try {
      const entity = await this.findOne(id);
      await this.subCategoryRepository.delete(entity.id);

      return entity;
    } catch (e) {
      throw new BadRequestException();
    }
  }

  count(queryParams?: QSParams): Promise<number> {
    if (queryParams) {
      if (queryParams.code) {
        queryParams.code = slugify(queryParams.code);
      }
    }

    let whereClause = { deleted: false };

    if (queryParams) {
      whereClause = {
        ...whereClause,
        ...queryParams,
      };
    }

    return this.subCategoryRepository.count({
      where: whereClause,
    });
  }
}
