import { PrismaClient, Sex, ExpenseStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.trip.deleteMany();
  await prisma.participant.deleteMany();

  const participant = await prisma.participant.create({
    data: {
      name: 'Jan',
      surname: 'Kowalski',
      sex: Sex.MALE,
      birth_date: new Date('2000-01-01'),
    },
  });

  const trip = await prisma.trip.create({
    data: {
      title:  'Wrocław',
      participant_id: participant.id,
      started_at: new Date('2026-06-01T08:00:00.000Z'),
      ended_at: new Date('2026-06-07T20:00:00.000Z'),
    },
  });

  await prisma.expense.create({
    data: {
      cost: 120.0,
      participant_id: participant.id,
      trip_id: trip.id,
      status: ExpenseStatus.PAID,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });