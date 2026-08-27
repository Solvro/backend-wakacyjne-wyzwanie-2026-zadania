import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XyzModule } from './xyz/xyz.module';

@Module({
  imports: [XyzModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
