import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from '../entities/product.entity';
import { Response } from '../utils/response.util';
import { BadRequestResponseDto } from '../utils/dto.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseMessage } from '../utils/const.util';
import { CreateProductRequestDto, FindAllQueryDto } from './dto/product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiCreatedResponse({ type: Response<Product> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateProductRequestDto,
  ): Promise<Response<Product>> {
    const result = await this.productService.create(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }

  @ApiCreatedResponse({ type: Response<Product[]> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: FindAllQueryDto): Promise<Response<Product[]>> {
    const result = await this.productService.findAll(query);
    const response = new Response(result.data, ResponseMessage.GET_OK);
    response.setMetadata(result.totalData, query.limit, query.page);
    return response;
  }

  @ApiCreatedResponse({ type: Response<Product> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: CreateProductRequestDto,
  ): Promise<Response<Product>> {
    const result = await this.productService.update(body, id);
    return new Response(result, ResponseMessage.UPDATE_OK);
  }

  @ApiOkResponse({ type: Response<boolean> })
  @ApiBearerAuth('access_token')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<Response<boolean>> {
    const result = await this.productService.delete(id);
    return new Response(result, ResponseMessage.DELETE_OK);
  }
}
