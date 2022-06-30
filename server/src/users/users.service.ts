import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOneBy({ username: username });
  }

  async register(username: string, password: string): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.passwordHash = hash;
    return await this.usersRepository.save(user);
  }
}
