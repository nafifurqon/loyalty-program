import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('User is not found');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  generateToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        email: user.email,
        userId: user.id,
      }),
    };
  }
}
