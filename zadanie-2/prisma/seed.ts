import { PrismaClient, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.tripParticipant.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  const trip = await prisma.trip.create({
    data: {
      destination: 'Rzym',
      date_start: new Date('2026-06-10'),
      date_end: new Date('2026-06-17'),
    },
  });

  const participant = await prisma.participant.create({
    data: {
      first_name: 'Jan',
      last_name: 'Kowalski',
      passport_number: 'XYZ987654',
    },
  });

  await prisma.tripParticipant.create({
    data: {
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Kolacja w restauracji',
      price: 120.50,
      category: ExpenseCategory.FOOD,
      trip_id: trip.id,
    },
  });

  console.log('Seedowanie zakończone!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });