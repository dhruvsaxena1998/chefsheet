import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './config/ormconfig';

import { ApiModule } from './api.module';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ApiModule],
  controllers: [AppController],
})
export class AppModule {}
