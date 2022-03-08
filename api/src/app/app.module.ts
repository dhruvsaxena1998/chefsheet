import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnexModule } from 'nestjs-knex';

import ormconfig from '../config/ormconfig';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          port: 3306,
          user: 'root',
          password: 'root',
          database: 'chefsheet',
        },
      },
    }),
    ApiModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
