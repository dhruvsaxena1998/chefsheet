import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './config/ormconfig';

import { UsersModule } from './services/users/users.module';
import { EventsModule } from './services/events/events.module';
import { ItemsModule } from './services/items/items.module';
import { CategoryModule } from './services/category/category.module';
import { SubCategoryModule } from './services/sub-category/sub-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    EventsModule,
    ItemsModule,
    CategoryModule,
    SubCategoryModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
