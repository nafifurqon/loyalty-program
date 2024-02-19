import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateTransactionItemRequestDto {
  @ApiProperty({ example: '409fb0fd-2f05-4fe0-9387-dabffa065d07' })
  @IsNotEmpty()
  @IsUUID()
  product_id: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateTransactionRequestDto {
  @ApiProperty({ example: '490d01de-9d15-43b1-8d39-df2636dadada' })
  @IsNotEmpty()
  @IsUUID()
  member_id: string;

  @ApiProperty({ example: 0 })
  @IsOptional()
  @Transform(({ value }) => {
    if (!value) return 0;
    return value;
  })
  redeemed_point: number;

  @ApiProperty({
    example: [
      {
        product_id: '9b55b911-2ecd-4a33-8730-e2d83e7ab9ac',
        quantity: 3,
      },
      {
        product_id: '409fb0fd-2f05-4fe0-9387-dabffa065d07',
        quantity: 4,
      },
    ],
  })
  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateTransactionItemRequestDto)
  items: CreateTransactionItemRequestDto[];
}

export class CreateNewTransactionPayloadDto {
  public code: string;
  public member_id: string;
  public total_amount_primary: number;
  public total_amount: number;
  public redeemed_point: number;
}
