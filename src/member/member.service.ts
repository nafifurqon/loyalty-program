import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MemberRepository } from './member.repository';
import {
  CreateMemberRequestDto,
  FindAllQueryDto,
  FindByIdResponseDto,
} from './dto/member.dto';
import { Member } from '../entities/member.entity';
import { FindAllResponseDto } from '../utils/dto.util';
import { TierModel } from '../tier/tier.repository';
import { PointHistoryRepository } from '../point-history/point-history.repository';
import { FindByMemberIdsAndTypeResponseDto } from '../point-history/dto/point-history.dto';

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberRepository)
    private readonly memberRepository: MemberRepository,
    @Inject(TierModel)
    private readonly tierRepository: TierModel,
    @Inject(PointHistoryRepository)
    private readonly pointHistoryRepository: PointHistoryRepository,
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
      const result = { data: [], totalData: 0 };

      const [data, totalData] = await Promise.all([
        this.memberRepository.findAll(query),
        this.memberRepository.findAllTotal(),
      ]);
      if (!totalData) return result;

      result.totalData = totalData;

      const memberIds = data.map((item) => item.id);
      const [earnedHistories, redeemedHistories] = await Promise.all([
        this.pointHistoryRepository.findByMemberIdsAndType(memberIds, 'earn'),
        this.pointHistoryRepository.findByMemberIdsAndType(memberIds, 'redeem'),
      ]);

      const mapHistoryByMemberId = new Map<
        string,
        FindByMemberIdsAndTypeResponseDto[]
      >();

      for (const item of earnedHistories) {
        let current = mapHistoryByMemberId.get(item.member_id);
        if (!current) {
          mapHistoryByMemberId.set(item.member_id, []);
        }

        current = mapHistoryByMemberId.get(item.member_id);
        current.push(item);
        mapHistoryByMemberId.set(item.member_id, current);
      }

      for (const item of redeemedHistories) {
        let current = mapHistoryByMemberId.get(item.member_id);
        if (!current) {
          mapHistoryByMemberId.set(item.member_id, []);
        }

        current = mapHistoryByMemberId.get(item.member_id);
        current.push(item);
        mapHistoryByMemberId.set(item.member_id, current);
      }

      result.data = data.map((item) => {
        return {
          ...item,
          point_histories: mapHistoryByMemberId.get(item.id),
        };
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string): Promise<FindByIdResponseDto> {
    try {
      const member = await this.memberRepository.findById(id);
      member.tier = await this.tierRepository.findOne({ id: member.tier_id });

      return member;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
