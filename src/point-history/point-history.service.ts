import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PointHistoryRepository } from './point-history.repository';
import { FindAllQueryDto, FindAllResponseDto } from './dto/point-history.dto';

@Injectable()
export class PointHistoryService {
  constructor(
    /** repositories */
    @Inject(PointHistoryRepository)
    private readonly pointHistoryRepository: PointHistoryRepository,
  ) {}

  async findAll(query: FindAllQueryDto): Promise<FindAllResponseDto> {
    try {
      const result = { data: [], totalData: 0 };

      const { data, count } = await this.pointHistoryRepository.findAll(query);
      if (!count) return result;

      result.totalData = count;
      result.data = data;

      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
