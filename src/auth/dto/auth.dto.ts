import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from '../../utils/const.util';

export class LoginDto {
  @ApiProperty({ example: 'admin@loyaltyprogram.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin!2024' })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}

export class JwtPayloadDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  userId: string;
}

export class RegisterUserRequestDto extends LoginDto {
  @ApiProperty({ example: 'Admin!2024' })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirm_password: string;
}

export class RegisterUserResponseDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  email: string;
}
