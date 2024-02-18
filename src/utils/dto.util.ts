import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class BadRequestResponseDto {
  @ApiProperty({
    example: 'password must be longer than or equal to 8 characters',
  })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 400 })
  statusCode: number;
}

export class PageLimitOffsetRequestDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? Number(value) : 1;
  })
  @IsInt()
  @Min(1)
  public page?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? Number(value) : 1;
  })
  @IsInt()
  @Min(1)
  public limit?: number;

  @Transform(({ obj }) => {
    return (obj.page - 1) * obj.limit;
  })
  public offset?: number;

  protected setPage?() {
    if (!this.page) this.page = 1;
    return this.page;
  }

  protected setLimit?() {
    if (!this.limit) this.limit = 10;
    return this.limit;
  }

  protected setOffset?() {
    if (!this.offset) this.offset = (this.page - 1) * this.limit;
    return this.offset;
  }

  constructor() {
    this.setPage();
    this.setLimit();
    this.setOffset();
  }
}

export class FindAllResponseDto<T> {
  public totalData: number;
  public data: T[];
}
