import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { PageLimitOffsetRequestDto } from '../../utils/dto.util';
import { Transform } from 'class-transformer';

export class CreateTierRequestDto {
  @ApiProperty({ example: 'Bronze' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  minimum_point: number;

  @ApiProperty({ example: 100 })
  @IsNotEmpty()
  @IsInt()
  @Max(999999)
  maximum_point: number;
}

export class FindAllQueryDto extends PageLimitOffsetRequestDto {
  @ApiProperty({ example: 1, required: false })
  @ValidateIf((query: FindAllQueryDto) => query.display !== 'all')
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ example: 1, required: false })
  @ValidateIf((query: FindAllQueryDto) => query.display !== 'all')
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;

  @ApiProperty({ example: 'all', required: false })
  @IsOptional()
  @ValidateIf(
    (query: FindAllQueryDto) => query.page !== undefined || query.page !== 0,
  )
  @IsIn(['all'])
  display?: string;
}
