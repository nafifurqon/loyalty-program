import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsDateFormat } from '../../utils/validators/date-format.validator';
import { Status } from '../../utils/enum.util';
import { PageLimitOffsetRequestDto } from '../../utils/dto.util';

export class CreateMemberRequestDto {
  @ApiProperty({ example: 'member name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 'admin@loyaltyprogram.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '6281234567890' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @IsDateFormat('YYYY-MM-DD')
  birth_date: string;

  @ApiProperty({ example: 'jakarta' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'referalmember1' })
  @IsOptional()
  @IsString()
  referal_code: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  tier_id?: string;
}

export class FindAllQueryDto extends PageLimitOffsetRequestDto {}
