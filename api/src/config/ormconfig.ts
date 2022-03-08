import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'chefsheet',
  synchronize: false,
  entities: ['dist/services/**/*.entity.js'],
  migrations: ['dist/config/migrations/*.js'],
  cli: {
    migrationsDir: 'src/config/migrations',
  },
  logging: process.env.NODE_ENV === 'development',
};

export default config;
