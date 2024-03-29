import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmAsyncConfig } from '../db/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TierModule } from './tier/tier.module';
import { ProductModule } from './product/product.module';
import { MemberModule } from './member/member.module';
import { LoyaltyProgramModule } from './loyalty-program/loyalty-program.module';
import { TransactionModule } from './transaction/transaction.module';
import { PointHistoryModule } from './point-history/point-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    UserModule,
    AuthModule,
    TierModule,
    ProductModule,
    MemberModule,
    LoyaltyProgramModule,
    TransactionModule,
    PointHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
