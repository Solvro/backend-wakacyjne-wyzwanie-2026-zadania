import { Module } from '@nestjs/common';
import { XyzService } from './xyz.service';
import { XyzController } from './xyz.controller';

@Module({
  controllers: [XyzController],
  providers: [XyzService],
})
export class XyzModule {}
