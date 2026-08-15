import { Module } from '@nestjs/common';
import { SolvroController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [SolvroController],
  providers: [AppService],
})
export class AppModule {}
