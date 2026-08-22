import { PrismaClient, Type } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const trip = await prisma.trip.create({
    data: {
      type: Type.DOMESTIC,
      start: new Date('2026-08-19T08:00:00Z'),
      end: new Date('2026-08-22T18:00:00Z'),
      participants: {
        create: {
          first_name: 'Cezary',
          last_name: 'Baryka',
        },
      },
    },
    include: {
      participants: true,
    },
  });
  const expense = await prisma.expense.create({
    data: {
      ammount: 2000.0,
      title: 'Opłata all inclusive',
      trip_id: trip.trip_id,
      payer_id: trip.participants[0].participant_id,
    },
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
