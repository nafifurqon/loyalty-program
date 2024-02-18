import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import appConfig from './app.config';

export const jwtConfig: JwtModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<JwtModuleOptions> => {
    return {
      secret: configService.get('APP_SECRET'),
      signOptions: {
        expiresIn: '1d',
      },
    };
  },
  // useFactory: () => {
  //   return {
  //     secret: appConfig().appSecret,
  //     signOptions: {
  //       expiresIn: '1d',
  //     },
  //   };
  // },
};
