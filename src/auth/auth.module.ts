import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtGuard } from './custom-jwt.guard';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "Key_secret",
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomJwtGuard],
  exports: [CustomJwtGuard, JwtModule],
})
export class AuthModule {}
