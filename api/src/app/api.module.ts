import { Module } from '@nestjs/common';

import { ItemsModule } from '../services/items';

import { CategoryModule } from '../services/category';
import { SubCategoryModule } from '../services/sub-category';

import { AuthModule } from '../services/auth';
import { UsersModule } from '../services/users';

@Module({
  imports: [CategoryModule, ItemsModule, SubCategoryModule, AuthModule, UsersModule],
})
export class ApiModule {}
