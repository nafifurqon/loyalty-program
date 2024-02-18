import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Min, MinLength } from 'class-validator';
import { PageLimitOffsetRequestDto } from '../../utils/dto.util';

export class CreateProductRequestDto {
  @ApiProperty({ example: 'beras' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({ example: 1000 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  price: number;
}

export class FindAllQueryDto extends PageLimitOffsetRequestDto {}
