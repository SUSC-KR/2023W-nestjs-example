import { Module } from '@nestjs/common';

import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { PasswordGenerator } from './services/password-generator';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [LoginController],
  providers: [LoginService, PasswordGenerator],
})
export class UserModule {}
