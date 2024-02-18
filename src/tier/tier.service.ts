import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tier } from '../entities/tier.entity';
import { EntityManager, Repository } from 'typeorm';
import {
  CreateTierRequestDto,
  FindAllQueryDto,
  FindAllResponseDto,
} from './dto/tier.dto';
import { TierModel } from './tier.repository';

@Injectable()
export class TierService {
  private entityManager: EntityManager;

  constructor(
    @InjectRepository(Tier)
    private tierRepository: Repository<Tier>,
    @Inject(TierModel)
    private readonly tierModel: TierModel,
  ) {}

  async create(data: CreateTierRequestDto): Promise<Tier> {
    try {
      const newTier = this.tierRepository.create({
        ...data,
      });
      return await this.tierRepository.save(newTier);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<FindAllResponseDto> {
    try {
      const [data, totalData] = await Promise.all([
        this.tierModel.findAll(query),
        this.tierModel.findAllTotal(),
      ]);

      return { data, totalData };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: CreateTierRequestDto, id: string): Promise<Tier> {
    try {
      const tier = await this.tierRepository.findOneBy({ id });

      if (!tier) throw new BadRequestException('Tier is not found');

      return await this.tierRepository.save({
        ...tier,
        ...data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
