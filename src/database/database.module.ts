import { Module } from '@nestjs/common';
import { PrismaService } from "./database.service";

@Module({
  providers: [PrismaService],
  exports:[PrismaService],
})

export class PrismaModule {}
