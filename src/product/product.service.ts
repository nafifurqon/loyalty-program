import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductRequestDto, FindAllQueryDto } from './dto/product.dto';
import { Product } from '../entities/product.entity';
import { FindAllResponseDto } from '../utils/dto.util';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async create(payload: CreateProductRequestDto): Promise<Product> {
    try {
      return await this.productRepository.create(payload);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(query: FindAllQueryDto): Promise<FindAllResponseDto<Product>> {
    try {
      const [data, totalData] = await Promise.all([
        this.productRepository.findAll(query),
        this.productRepository.findAllTotal(),
      ]);

      return { data, totalData };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(data: CreateProductRequestDto, id: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOneById(id);

      if (!product) throw new BadRequestException('Product is not found');

      await this.productRepository.update(data, id);

      return await this.productRepository.findOneById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
