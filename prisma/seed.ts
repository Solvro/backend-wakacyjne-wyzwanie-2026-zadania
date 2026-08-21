import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  const trip = await prisma.trip.create({
    data: {
        title: 'Wyjazd w Karkonosze',
        startDate: new Date('2026-09-10T10:00:00Z'),
        endDate: new Date('2026-09-21T10:00:00Z'),
        status: 'PLANNED',
    },
  });

  const participant = await prisma.participant.create({
    data: {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
    },
  });

  await prisma.expense.create({
    data: {
        tripId: trip.id,
        payerId: participant.id,
        amount: 250.0,
        description: 'Paliwo',
        expenseDate: new Date(),
    },
  });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });