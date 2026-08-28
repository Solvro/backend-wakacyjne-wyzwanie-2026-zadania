import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import 'dotenv/config';

if (
  process.env.DATABASE_URL === undefined ||
  process.env.DATABASE_URL.trim() === ''
) {
  throw new Error(
    'Brak zmiennej DATABASE_URL w procesie! Upewnij się, że plik .env istnieje.',
  );
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.expense.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();

  const trip = await prisma.trip.create({
    data: {
      title: 'Wyjazd Szkoleniowo Integracyjny Solvro 2026',
      startDate: new Date('2026-11-13'),
      endDate: new Date('2026-11-15'),
    },
  });

  const [jan, anna] = await Promise.all([
    prisma.participant.create({
      data: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        budget: 1500.0,
        email: 'jan@example.com',
        phone: '+48 600 000 001',
        tripId: trip.id,
      },
    }),
    prisma.participant.create({
      data: {
        firstName: 'Anna',
        lastName: 'Nowak',
        budget: 1200.34,
        email: 'anna@example.com',
        tripId: trip.id,
      },
    }),
  ]);

  await prisma.expense.createMany({
    data: [
      {
        title: 'Ośrodek (3 noce)',
        value: 620.0,
        tripId: trip.id,
        participantId: anna.id,
      },
      {
        title: 'Alkohol',
        value: 280.0,
        tripId: trip.id,
        participantId: jan.id,
      },
      {
        title: 'Jedzenie',
        value: 95.5,
        tripId: trip.id,
      },
    ],
  });
}

main()
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
