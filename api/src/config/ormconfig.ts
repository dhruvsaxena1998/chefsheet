import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/services/**/*.entity.js'],
  synchronize: process.env.NODE_ENV === 'development',
  migrations: ['dist/config/migrations/*.js'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
  logging: process.env.NODE_ENV === 'development',
};

export default config;
