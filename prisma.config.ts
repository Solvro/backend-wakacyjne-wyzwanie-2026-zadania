import { defineConfig } from "prisma/config";

export default defineConfig({
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },

  datasource: {
    url: "postgresql://postgres:28302007@localhost:5432/trip?schema=public",
  },
});