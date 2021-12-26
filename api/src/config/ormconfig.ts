import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['dist/services/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/config/migrations/*.js'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
  logging: true,
};

export default config;
