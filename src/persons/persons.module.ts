import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
  imports: [DatabaseModule]
})
export class PersonsModule {}
