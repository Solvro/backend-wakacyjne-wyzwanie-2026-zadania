import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  const participant = await prisma.participant.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Jan Kowalski",
      age: 25,
      gender: "MALE",
    },
  });

  const trip = await prisma.trip.upsert({
    where: { id: 1 },
    update: {},
    create: {
      destination: "Paryż",
      date: new Date("2026-08-25T12:00:00Z"),
    },
  });

  const expense = await prisma.expense.upsert({
    where: { id: 1 },
    update: {},
    create: {
      tripId: trip.id,
      participantId: participant.id,
      value: 150.5,
      includesTransport: true,
      timestamp: new Date(),
    },
  });

  console.log("Seed result: ", { participant, trip, expense });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
