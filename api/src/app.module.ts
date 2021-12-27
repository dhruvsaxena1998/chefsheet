import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import ormconfig from './config/ormconfig';

import { ApiModule } from './api.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), ApiModule],
  controllers: [AppController],
})
export class AppModule {}
