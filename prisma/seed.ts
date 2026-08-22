import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje w Chorwacji',
      startDate: new Date('2026-08-15'),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: 'Jan Kowalski',
      role: 'ADMIN',
      tripId: trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      amount: 1500.50,
      description: 'Zaliczka na apartament',
      tripId: trip.id,
      participantId: participant.id,
    },
  });

  console.log('Baza danych została zasilona przykładowymi danymi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });