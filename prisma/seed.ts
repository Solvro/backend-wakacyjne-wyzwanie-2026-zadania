import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Category } from '@prisma/client';

// Konfiguracja adaptera dla Prisma 7
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
      Title: 'Wyjazd do Karpacza',
      Description: 'Wyprawa autostopem do Karpacza w celu zdobycia Śnieżki.',
      Cost_pln: 500,
    },
  });

  const jan = await prisma.participant.create({
    data: {
      Name: 'Jan Kowalski',
      Age: 30,
      Email: 'jan.kowalski@example.com',
      Role: Role.Owner,
      Trip_id: trip.Trip_id,
    },
  });

  const anna = await prisma.participant.create({
    data: {
      Name: 'Anna Nowak',
      Age: 28,
      Email: 'anna.nowak@example.com',
      Role: Role.Member,
      Trip_id: trip.Trip_id,
    },
  });

  await prisma.expense.createMany({
    data: [
      {
        Product_name: 'Nocleg',
        Amount_pln: 100,
        Category: Category.Accomodation,
        Paid_by_id: jan.Participant_id,
        Trip_id: trip.Trip_id,
      },
      {
        Product_name: 'Jedzenie',
        Amount_pln: 50,
        Category: Category.Food,
        Paid_by_id: anna.Participant_id,
        Trip_id: trip.Trip_id,
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