import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { RegisterUserRequestDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async register(data: RegisterUserRequestDto): Promise<User> {
    try {
      const user = new User();
      user.email = data.email;
      user.password = data.password;

      const registeredUser = await this.usersRepository.save(user);
      delete registeredUser.password;

      return registeredUser;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ email });
  }
}
