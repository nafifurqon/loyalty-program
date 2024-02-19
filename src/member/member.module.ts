import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from '../entities/member.entity';
import { MemberRepository } from './member.repository';
import { TierModel } from '../tier/tier.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository, TierModel],
})
export class MemberModule {}
