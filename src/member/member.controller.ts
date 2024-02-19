import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MemberService } from './member.service';
import { Response } from '../utils/response.util';
import { BadRequestResponseDto } from '../utils/dto.util';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseMessage } from '../utils/const.util';
import { Member } from '../entities/member.entity';
import { CreateMemberRequestDto, FindAllQueryDto } from './dto/member.dto';

@ApiTags('member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiCreatedResponse({ type: Response<Member> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() body: CreateMemberRequestDto,
  ): Promise<Response<Member>> {
    const result = await this.memberService.create(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }

  @ApiCreatedResponse({ type: Response<Member[]> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query() query: FindAllQueryDto): Promise<Response<Member[]>> {
    const result = await this.memberService.findAll(query);
    const response = new Response(result.data, ResponseMessage.GET_OK);
    response.setMetadata(result.totalData, query.limit, query.page);
    return response;
  }

  @ApiCreatedResponse({ type: Response<Member> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiBearerAuth('access_token')
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string): Promise<Response<Member>> {
    const result = await this.memberService.findById(id);
    const response = new Response(result, ResponseMessage.GET_OK);
    return response;
  }
}
