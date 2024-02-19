import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { CreateMemberRequestDto, FindAllQueryDto } from './dto/member.dto';
import { Member } from '../entities/member.entity';
import { FindAllResponseDto } from '../utils/dto.util';
import { TierModel } from '../tier/tier.repository';

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberRepository)
    private readonly memberRepository: MemberRepository,
    @Inject(TierModel)
    private readonly tierRepository: TierModel,
  ) {}

  async create(payload: CreateMemberRequestDto): Promise<Member> {
    try {
      const lowestTier = await this.tierRepository.findOne({
        minimum_point: 0,
      });
      payload.tier_id = lowestTier.id;

      return await this.memberRepository.create(payload);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<FindAllResponseDto<Member>> {
    try {
      const [data, totalData] = await Promise.all([
        this.memberRepository.findAll(query),
        this.memberRepository.findAllTotal(),
      ]);

      return { data, totalData };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<Member> {
    try {
      const member = await this.memberRepository.findById(id);
      member.tier = await this.tierRepository.findOne({ id: member.tier_id });

      return member;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
