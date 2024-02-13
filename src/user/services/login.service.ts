import * as jwt from 'jsonwebtoken';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from '../entity/user.entity';
import { ulid } from 'ulid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordGenerator } from './password-generator';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly passwordGenerator: PasswordGenerator,
  ) {}

  async createUser(userId: string, rawPassword: string): Promise<UserEntity> {
    const prevUser = await this.userRepository.findOneBy({ userId });
    if (prevUser) {
      throw new UnprocessableEntityException('User already exists');
    }

    const password = this.passwordGenerator.generate(rawPassword);

    const newUser = new UserEntity();
    newUser.id = ulid();
    newUser.userId = userId;
    newUser.password = password.hash;
    newUser.salt = password.salt;
    newUser.createdAt = new Date();
    await this.userRepository.save(newUser);

    return newUser;
  }

  async login(userId: string, rawPassword: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    const password = this.passwordGenerator.generate(rawPassword, user.salt);

    if (!user || user.password !== password.hash) {
      throw new UnprocessableEntityException('Invalid credentials');
    }

    const jwtSecret = 'jwtSecret';
    const token = jwt.sign({ userId: user.id }, jwtSecret);

    return token;
  }
}
