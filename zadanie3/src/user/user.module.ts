import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
  imports: [PassportModule, JwtModule.register({
    global: true,
    secret: process.env.SECRET_KEY,
  })],
})
export class UserModule {}
