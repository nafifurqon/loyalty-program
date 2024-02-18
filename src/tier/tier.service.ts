import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tier } from '../entities/tier.entity';
import { Repository } from 'typeorm';
import { CreateTierRequestDto, FindAllQueryDto } from './dto/tier.dto';
import { TierModel } from './tier.repository';
import { FindAllResponseDto } from '../utils/dto.util';

@Injectable()
export class TierService {
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

  async findAll(query: FindAllQueryDto): Promise<FindAllResponseDto<Tier>> {
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

  async delete(id: string): Promise<boolean> {
    try {
      const tier = await this.tierRepository.findOneBy({ id });

      if (!tier) throw new BadRequestException('Tier is not found');

      await this.tierRepository.remove(tier);

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
