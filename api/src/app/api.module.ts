import { Module } from '@nestjs/common';

import { ItemsModule } from '../services/items';

import { CategoryModule } from '../services/category';
import { SubCategoryModule } from '../services/sub-category';

@Module({
  imports: [CategoryModule, ItemsModule, SubCategoryModule],
})
export class ApiModule {}
