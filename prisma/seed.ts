import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje z KN Solvro',
      startDate: new Date('2026-08-01T10:00:00Z'),
      participants: {
        create: {
          name: 'Bohdan',
        },
      },
      expenses: {
        create: {
          amount: 150.50,
          description: 'Paliwo',
          category: 'TRANSPORT',
        },
      },
    },
  });

  console.log('Gotowe! Przykładowe dane zostały dodane:', trip);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });