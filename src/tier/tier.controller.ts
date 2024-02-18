import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Tier } from '../entities/tier.entity';
import { BadRequestResponseDto } from '../utils/dto.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTierRequestDto, FindAllQueryDto } from './dto/tier.dto';
import { TierService } from './tier.service';
import { ResponseMessage } from '../utils/const.util';
import { Response } from '../utils/response.util';

@ApiTags('tier')
@Controller('tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @ApiCreatedResponse({ type: Response<Tier> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: CreateTierRequestDto): Promise<Response<Tier>> {
    const result = await this.tierService.create(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }

  @ApiCreatedResponse({ type: Response<Tier[]> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: FindAllQueryDto): Promise<Response<Tier[]>> {
    const result = await this.tierService.findAll(query);
    const response = new Response(result.data, ResponseMessage.GET_OK);
    response.setMetadata(result.totalData, query.limit, query.page);
    return response;
  }

  @ApiCreatedResponse({ type: Response<Tier> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() body: CreateTierRequestDto,
  ): Promise<Response<Tier>> {
    const result = await this.tierService.update(body, id);
    return new Response(result, ResponseMessage.UPDATE_OK);
  }
}
