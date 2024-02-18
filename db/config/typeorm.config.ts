import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      // type: 'mysql',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      password: configService.get('DB_PASSWORD'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: true,

      /** for localhost (http) */
      ssl: false,

      /** for production (https) */
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    };
  },
};
