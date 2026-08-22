import 'dotenv/config';
import {
  ExpenseCategory,
  PrismaClient,
  TripStatus,
} from '../generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje w Hiszpanii',
      destination: 'Barcelona',
      startDate: new Date('2026-07-10'),
      endDate: new Date('2026-07-17'),
      status: TripStatus.FINISHED,
    },
  });

  const [jan, anna] = await Promise.all([
    prisma.participant.create({
      data: {
        tripId: trip.id,
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan@example.com',
        joinedAt: new Date(),
      },
    }),
    prisma.participant.create({
      data: {
        tripId: trip.id,
        firstName: 'Anna',
        lastName: 'Nowak',
        email: 'anna@example.com',
        joinedAt: new Date(),
      },
    }),
  ]);

  await prisma.expense.createMany({
    data: [
      {
        tripId: trip.id,
        participantId: jan.id,
        title: 'Obiad',
        amount: 89.99,
        category: ExpenseCategory.FOOD,
        description: 'Restauracja przy plaży',
        createdAt: new Date(),
      },
      {
        tripId: trip.id,
        participantId: anna.id,
        title: 'Hotel',
        amount: 1200,
        category: ExpenseCategory.HOTEL,
        description: '7 noclegów',
        createdAt: new Date(),
      },
      {
        tripId: trip.id,
        participantId: jan.id,
        title: 'Metro',
        amount: 35.5,
        category: ExpenseCategory.TRANSPORT,
        description: 'Bilety tygodniowe',
        createdAt: new Date(),
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
