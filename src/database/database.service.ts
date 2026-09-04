import { Injectable } from "@nestjs/common";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPostgresAdapter } from "@prisma/adapter-ppg";
@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPostgresAdapter({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
}