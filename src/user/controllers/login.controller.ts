import { Body, Controller, Post } from '@nestjs/common';

import {
  CreateUserRequestDto,
  CreateUserResponseDto,
} from './dto/create-user.dto';
import { LoginService } from '../services/login.service';
import { LoginRequestDto, LoginResponseDto } from './dto/login.dto';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/users')
  async createUser(
    @Body() requestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const { userId, password } = requestDto;

    const user = await this.loginService.createUser(userId, password);

    return {
      id: user.id,
      userId: user.userId,
      createdAt: user.createdAt,
    };
  }

  @Post('/login')
  async login(@Body() requestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { userId, password } = requestDto;

    const token = await this.loginService.login(userId, password);

    return { token };
  }
}
