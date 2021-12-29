import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/services/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/config/migrations/*.js'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
  logging: true,
};

export default config;
