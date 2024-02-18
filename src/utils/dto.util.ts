import { ApiProperty } from '@nestjs/swagger';

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
