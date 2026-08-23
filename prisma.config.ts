import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: "postgresql://postgres:3450Dmeme@localhost:5432/test?schema=public",
  },
  migrations: {
    seed: 'npx tsx prisma/seed.ts',
  },
});