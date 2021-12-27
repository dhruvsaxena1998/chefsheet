import { Module } from '@nestjs/common';

import { UsersModule } from './services/users';

import { ItemsModule } from './services/items';
import { EventsModule } from './services/events';

import { CategoryModule } from './services/category';
import { SubCategoryModule } from './services/sub-category';

@Module({
  imports: [
    UsersModule,
    CategoryModule,
    EventsModule,
    ItemsModule,
    SubCategoryModule,
  ],
})
export class ApiModule {}
