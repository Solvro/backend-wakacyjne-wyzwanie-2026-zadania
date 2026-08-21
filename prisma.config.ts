import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});