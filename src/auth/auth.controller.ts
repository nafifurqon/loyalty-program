import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import {
  LoginResponseDto,
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from './dto/auth.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { BadRequestResponseDto } from '../utils/dto.util';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOkResponse({ status: 200, type: LoginResponseDto })
  @ApiBadRequestResponse({ status: 400, type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ status: 401 })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @ApiCreatedResponse({ type: RegisterUserResponseDto })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @Post('/register')
  async register(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: RegisterUserRequestDto,
  ): Promise<User> {
    return await this.userService.register(body);
  }
}
