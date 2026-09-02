import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PrismaService extends DatabaseService {
  constructor() {
    super();
  }
}
