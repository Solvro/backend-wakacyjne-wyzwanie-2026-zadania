import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js'

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(){
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL as string,
        });
        super({ adapter });
    }
}




