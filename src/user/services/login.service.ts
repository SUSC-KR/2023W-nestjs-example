import * as jwt from 'jsonwebtoken';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { ulid } from 'ulid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userId: string, password: string): Promise<UserEntity> {
    const prevUser = await this.userRepository.findOneBy({ userId });
    if (prevUser) {
      throw new UnprocessableEntityException('User already exists');
    }

    const newUser = new UserEntity();
    newUser.id = ulid();
    newUser.userId = userId;
    newUser.password = password;
    newUser.salt = 'salt';
    newUser.createdAt = new Date();
    await this.userRepository.save(newUser);

    return newUser;
  }

  async login(userId: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user || user.password !== password) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    const jwtSecret = 'jwtSecret';
    const token = jwt.sign({ userId: user.id }, jwtSecret);

    return token;
  }
}
