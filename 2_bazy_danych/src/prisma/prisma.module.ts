import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';

@Global()
@Module({
  controllers: [PrismaController],
  providers: [PrismaService],
  exports:  [PrismaService],
})
export class PrismaModule {}
