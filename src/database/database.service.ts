import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const url = process.env.DATABASE_URL;

    if (!url) {
      throw new Error('DATABASE_URL is not defined');
    }

    const adapter = new PrismaBetterSqlite3({
      url,
    });

    super({ adapter });
  }
}