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
  LoginDto,
  LoginResponseDto,
  RegisterUserRequestDto,
  RegisterUserResponseDto,
} from './dto/auth.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import { BadRequestResponseDto } from '../utils/dto.util';
import { Response } from '../utils/response.util';
import { ResponseMessage } from '../utils/const.util';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOkResponse({ status: 200, type: Response<LoginResponseDto> })
  @ApiBadRequestResponse({ status: 400, type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ status: 401 })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Request() req: any,
    @Body() body: LoginDto,
  ): Promise<Response<any>> {
    const result = this.authService.generateToken(req.user);
    return new Response(result, ResponseMessage.LOGIN_OK);
  }

  @ApiCreatedResponse({ type: Response<RegisterUserResponseDto> })
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @Post('/register')
  async register(
    @Body(
      new ValidationPipe({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    body: RegisterUserRequestDto,
  ): Promise<Response<User>> {
    const result = await this.userService.register(body);
    return new Response(result, ResponseMessage.CREATE_OK);
  }
}
