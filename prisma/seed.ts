import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL as string;

const pool = new Pool({
  connectionString,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const participant = await prisma.participant.create({
    data: {
      name: 'Krystian Lecnar',
      email: 'krystian2@example.com',
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: 'Wyjazd w Tatry',
      description: 'Przykładowy wyjazd testowy',
      budget: 2500.0,
      status: 'PLANNED',
      startDate: new Date('2026-09-10T00:00:00.000Z'),
      ownerId: participant.id,
    },
  });

  await prisma.expense.create({
    data: {
      name: 'Nocleg',
      amount: 450.0,
      category: 'ACCOMMODATION',
      description: 'Koszt noclegu',
      tripId: trip.id,
      paidById: participant.id,
    },
  });

  console.log('Dane testowe zostały dodane');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });