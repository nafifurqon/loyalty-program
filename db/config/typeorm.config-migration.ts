import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USERNAME'),
  database: configService.get('DB_NAME'),
  password: configService.get('DB_PASSWORD'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: true,
  logging: true,

  /** for localhost (http) */
  ssl: false,

  /** for production (https) */
  // ssl: {
  //   rejectUnauthorized: false,
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
