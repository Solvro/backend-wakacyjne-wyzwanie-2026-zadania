import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Wyjazd w Tatry',
      description: 'Zimowy wyjazd na narty',
      start_date: new Date('2026-12-10T10:00:00Z'),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: 'Jan Kowalski',
      trip_id: trip.id,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      amount: 150.50,
      category: 'FOOD',
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });

  console.log('Baza danych została zasilana testowymi danymi.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });