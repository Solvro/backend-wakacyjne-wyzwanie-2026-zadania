import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const wroclaw = await prisma.trip.create({
    data: {
      destination: "Wrocław",
      startDate: new Date("2024-06-01"),
    }
  });
  const alice = await prisma.participant.create({
    data: {
      name: "Alice",
      role: Role.MEMBER,
      trip: {
        connect: { id: wroclaw.id },
      },
    }
  });
  const jedzenie = await prisma.expense.create({
    data: {
      amount: 100.00,
      description: "jedzenie",
      trip: {
        connect: { id: wroclaw.id },
      },
      payer: {
        connect: { id: alice.id },
      },
    }
  });
  console.log({ alice, wroclaw, jedzenie });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });