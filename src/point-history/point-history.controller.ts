import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PointHistoryService } from './point-history.service';
import { BadRequestResponseDto } from '../utils/dto.util';
import { Response } from '../utils/response.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseMessage } from '../utils/const.util';
import { FindAllQueryDto } from './dto/point-history.dto';

@ApiTags('point-history')
@Controller('point-history')
export class PointHistoryController {
  constructor(private readonly pointHistoryService: PointHistoryService) {}

  @ApiCreatedResponse({ type: Response<any[]> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: FindAllQueryDto): Promise<Response<any[]>> {
    const result = await this.pointHistoryService.findAll(query);
    const response = new Response(result.data, ResponseMessage.GET_OK);
    response.setMetadata(result.totalData, query.limit, query.page);
    return response;
  }
}
