import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

import { ExpenseStatus, PrismaClient } from '../src/generated/prisma/client';
import type { User, Trip, Participant } from '../src/generated/prisma/client';

if (
  process.env.DATABASE_URL === undefined ||
  process.env.DATABASE_URL.trim() === ''
) {
  throw new Error('DATABASE_URL was not found in the environment variables');
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.trip.deleteMany();
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.user.deleteMany();

  const user1: User = await prisma.user.create({
    data: {
      email: 'jan@example.com',
      name: 'Jan',
      surname: 'Kowalski',
      password: 'password123',
    },
  });

  const user2: User = await prisma.user.create({
    data: {
      email: 'anna@example.com',
      name: 'Anna',
      surname: 'Nowak',
      password: 'password123',
    },
  });

  const trip: Trip = await prisma.trip.create({
    data: {
      title: 'Wyjazd w góry 01.07.2026',
      startDate: new Date('2026-07-01'),
      createdByUuid: user1.uuid,
    },
  });

  const participant1: Participant = await prisma.participant.create({
    data: {
      tripUuid: trip.uuid,
      userUuid: user1.uuid,
      nicknameInTrip: 'example nickname',
    },
  });

  const participant2: Participant = await prisma.participant.create({
    data: {
      tripUuid: trip.uuid,
      userUuid: user2.uuid,
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        title: 'Bilety na autobus',
        amount: 1200.02,
        currency: 'UAH',
        status: ExpenseStatus.SETTLED,
        payerUuid: participant1.uuid,
        tripUuid: trip.uuid,
      },
      {
        title: 'Kanapki na drogę',
        amount: 45.5,
        currency: 'EUR',
        status: ExpenseStatus.SETTLED,
        payerUuid: participant2.uuid,
        tripUuid: trip.uuid,
      },
      {
        title: 'Słodycze',
        amount: 88.23,
        payerUuid: participant2.uuid,
        tripUuid: trip.uuid,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
