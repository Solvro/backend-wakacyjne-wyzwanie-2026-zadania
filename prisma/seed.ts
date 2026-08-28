import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Category } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  const trip = await prisma.trip.create({
    data: {
      title: 'Wyjazd do Karpacza',
      description: 'Wyprawa autostopem do Karpacza w celu zdobycia Śnieżki.',
      costPln: 500,
    },
  });

  const jan = await prisma.participant.create({
    data: {
      name: 'Jan Kowalski',
      age: 30,
      email: 'jan.kowalski@example.com',
      role: Role.Owner,
      trips: {
        connect: [{ id: trip.id }],
      },
    },
  });

  const anna = await prisma.participant.create({
    data: {
      name: 'Anna Nowak',
      age: 28,
      email: 'anna.nowak@example.com',
      role: Role.Member,
      trips: {
        connect: [{ id: trip.id }],
      },
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        productName: 'Nocleg',
        amountPln: 100,
        category: Category.Accomodation,
        paidById: jan.id,
        tripId: trip.id,
      },
      {
        productName: 'Jedzenie',
        amountPln: 50,
        category: Category.Food,
        paidById: anna.id,
        tripId: trip.id,
      },
    ],
  });

  console.log('Seeding finished!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });