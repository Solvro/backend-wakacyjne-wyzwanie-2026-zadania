import { Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { PrismaService } from '../prisma.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseService],
  exports: [PrismaService, DatabaseService],
})
export class DatabaseModule {}

