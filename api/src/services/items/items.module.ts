import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemsEntity } from './items.entity';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemsEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
