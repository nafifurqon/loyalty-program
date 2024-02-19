import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { Response } from '../utils/response.util';
import { BadRequestResponseDto } from '../utils/dto.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTransactionRequestDto } from './dto/transaction.dto';
import { ResponseMessage } from '../utils/const.util';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @ApiCreatedResponse({ type: Response<boolean> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateTransactionRequestDto,
  ): Promise<Response<boolean>> {
    const result = await this.transactionService.create(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }
}
