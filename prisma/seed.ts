import { PrismaClient, Type } from '../src/generated';

const prisma = new PrismaClient();

async function main() {
  // 1. Rekord w tabeli Expense
  const expense = await prisma.expense.create({
    data: {
      name: 'Paliwo i parking',
    },
  });

  // 2. Rekord w tabeli Trip (powiązany z Expense)
  const trip = await prisma.trip.create({
    data: {
      participants: 1,
      type: Type.ONE_DAY,
      costId: expense.id, // Przypisujemy ID z wyżej utworzonego Expense
    },
  });

  // 3. Rekord w tabeli Participant (powiązany z Trip)
  const participant = await prisma.participant.create({
    data: {
      name: 'Jan',
      surname: 'Kowalski',
      tripId: trip.id, // Przypisujemy ID z wyżej utworzonego Trip
    },
  });

  console.log('Dodano rekordy:');
  console.log({ expense, trip, participant });
}

main()
  .catch((e) => {
    console.error('Błąd podczas seedowania:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });