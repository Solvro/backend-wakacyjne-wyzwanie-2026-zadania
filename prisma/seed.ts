import { PrismaClient, TripStatus, ExpenseCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje w Chorwacji',
      destination: 'Split, Chorwacja',
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'),
      budget: 5000,
      status: TripStatus.PLANNED,
      notes: 'Pamiętać o kremie z filtrem',
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: 'Jan Kowalski',
      email: 'jan@example.com',
      tripId: trip.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Bilety lotnicze',
      amount: 1200,
      category: ExpenseCategory.TRANSPORT,
      datetime: new Date('2026-06-15'),
      tripId: trip.id,
      paidById: participant.id,
    },
  });

  console.log('Seed zakończony pomyślnie');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

