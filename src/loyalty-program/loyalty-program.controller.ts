import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoyaltyProgramService } from './loyalty-program.service';
import { LoyaltyProgram } from '../entities/loyalty-program.entity';
import { BadRequestResponseDto } from '../utils/dto.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from '../utils/response.util';
import { ResponseMessage } from '../utils/const.util';
import {
  CreateLoyaltyProgramRequestDto,
  FindAllQueryDto,
  FindAllResponse,
} from './dto/loyalty-program.dto';

@ApiTags('loyalty-program')
@Controller('loyalty-program')
export class LoyaltyProgramController {
  constructor(private readonly loyaltyProgramService: LoyaltyProgramService) {}

  @ApiCreatedResponse({ type: Response<LoyaltyProgram> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateLoyaltyProgramRequestDto,
  ): Promise<Response<LoyaltyProgram>> {
    const result = await this.loyaltyProgramService.create(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }

  @ApiCreatedResponse({ type: Response<LoyaltyProgram[]> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query() query: FindAllQueryDto,
  ): Promise<Response<FindAllResponse[]>> {
    const result = await this.loyaltyProgramService.findAll(query);
    const response = new Response(result.data, ResponseMessage.GET_OK);
    response.setMetadata(result.totalData, query.limit, query.page);
    return response;
  }
}
