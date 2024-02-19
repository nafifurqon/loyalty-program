import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { LoyaltyProgramType } from '../../utils/enum.util';
import { IsDateFormat } from '../../utils/validators/date-format.validator';
import { Type } from 'class-transformer';
import { PageLimitOffsetRequestDto } from '../../utils/dto.util';

export class CreateLoyalProgramTierRequestDto {}

export class CreateLoyaltyProgramRequestDto {
  @ApiProperty({ example: 'pilpres' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'transactional' })
  @IsNotEmpty()
  @IsEnum(LoyaltyProgramType)
  type: LoyaltyProgramType;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  transaction_amount: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  is_first_purchase: boolean;

  @ApiProperty({ example: false })
  @IsNotEmpty()
  @IsBoolean()
  is_transactional_combine: boolean;

  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(100)
  percentage_benefit: number;

  @ApiProperty({ example: 0 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  fixed_point_benefit: number;

  @ApiProperty({ example: 999999999 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  maximum_point_benefit: number;

  @ApiProperty({ example: '2024-02-01' })
  @IsNotEmpty()
  @IsDateFormat('YYYY-MM-DD')
  start_date: string;

  @ApiProperty({ example: '2024-02-29' })
  @IsNotEmpty()
  @IsDateFormat('YYYY-MM-DD')
  end_date: string;

  @ApiProperty({
    example: [
      'ec099237-5a5a-484e-bba2-b19189d1aa33',
      'c59c8b97-6c93-479e-9325-6b32b29824ad',
      '5f831e17-1f69-41d8-8d26-e6c169660df3',
      '5edcd602-7bf5-4ac3-a4b6-a8f1b3fd7604',
    ],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('all', { each: true })
  @Type(() => String)
  tier_ids: string[];
}

export class FindAllQueryDto extends PageLimitOffsetRequestDto {}

export class FindAllTierResponse {
  public id: string;
  public name: string;
  public minimum_point: number;
  public maximum_point: number;
}

export class FindAllResponse {
  public id: string;
  public name: string;
  public type: string;
  public transaction_amount: number;
  public quantity: number;
  public is_first_purchase: boolean;
  public is_transactional_combine: boolean;
  public percentage_benefit: number;
  public fixed_point_benefit: number;
  public maximum_point_benefit: number;
  public start_date: string;
  public end_date: string;
  public created_at: string;
  public updated_at: string;
  public tiers: FindAllTierResponse[];
}

export class FindByLoyaltyProgramIdsResponse {
  public tier_id: string;
  public loyalty_program_id: string;
  public name: string;
  public minimum_point: number;
  public maximum_point: number;
}
