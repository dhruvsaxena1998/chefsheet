import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './services/users/users.module';

import ormconfig from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
  controllers: [AppController],
})
export class AppModule {}
