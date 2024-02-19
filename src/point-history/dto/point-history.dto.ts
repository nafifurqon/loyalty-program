import { ApiProperty } from '@nestjs/swagger';
import { PageLimitOffsetRequestDto } from '../../utils/dto.util';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsDateFormat } from '../../utils/validators/date-format.validator';
import { Transform } from 'class-transformer';
import { PointType } from '../enum/point-history.enum';

export class CreateNewPointHistoryDto {
  public member_id: string;
  public transaction_id: string;
  public loyalty_program_id?: string;
  public earned_point: number;
  public redeemed_point: number;
  public existing_point: number;
  public balance_point: number;
}

export class FindByMemberIdsAndTypeResponseDto {
  public transaction_id: string;
  public transaction_code: string;
  public transaction_date: string;
  public member_id: string;
  public point: number;
  public type: number;
}

export class FindAllQueryDto extends PageLimitOffsetRequestDto {
  @ApiProperty({
    example: '490d01de-9d15-43b1-8d39-df2636dadada',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  member_id?: string;

  @ApiProperty({ example: '2024-02-01' })
  @IsNotEmpty()
  @IsDateFormat('YYYY-MM-DD')
  start_date: string;

  @ApiProperty({ example: '2024-02-29' })
  @IsNotEmpty()
  @IsDateFormat('YYYY-MM-DD')
  end_date: string;

  @ApiProperty({ example: 'pres', required: false })
  @IsOptional()
  @Transform(({ value }) => {
    if (value) return value.trim();
    return value;
  })
  @IsString()
  loyalty_name?: string;

  @ApiProperty({ example: PointType.Earn })
  @IsEnum(PointType)
  type: PointType;
}

export class FindAllRepositoryResponse {
  data: any[];
  count: number;
}

export class FindAllResponseDto {
  public data: any[];
  public totalData: number;
}
