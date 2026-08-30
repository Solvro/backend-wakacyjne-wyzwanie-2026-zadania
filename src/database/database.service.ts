import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
    constructor() {
        // Tworzymy adapter zgodnie z wymogami nowej Prismy
        const connectionString = process.env.DATABASE_URL;
        const pool = new Pool({ connectionString });
        const adapter = new PrismaPg(pool);

        // Przekazujemy adapter do głównej klasy PrismaClient
        super({ adapter });
    }

    async onModuleInit() {
        await this.$connect();
    }
}