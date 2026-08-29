import 'dotenv/config';
import { PrismaClient, TripCategory } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();
  const trip = await prisma.trip.create({
    data: {
      title: 'Wyjazd w góry',
      category: TripCategory.VACATION,
      startDate: new Date('2026-09-15T08:00:00Z'),
      endDate: new Date('2026-09-22T20:00:00Z'),
      description: 'Coroczny wypad znajomych w Tatry',
      participants: {
        create: [
          { name: 'Anna Nowak', email: 'anna@example.com' },
          { name: 'Jan Kowalski', email: 'jan@example.com' },
          { name: 'Piotr Wiśniewski' },
        ],
      },
    },
    include: {
      participants: true,
    },
  });

  console.log(`Wycieczka utworzona: "${trip.title}" (ID: ${trip.id})`);

  await prisma.expense.create({
    data: {
      title: 'Zakupy spożywcze',
      amount: 124.5,
      description: 'Prowiant na całą wyprawę',
      tripId: trip.id,
      paidById: trip.participants[0].id,
    },
  });

  await prisma.expense.create({
    data: {
      title: 'Paliwo',
      amount: 320.0,
      tripId: trip.id,
      paidById: trip.participants[1].id,
    },
  });

  await prisma.expense.create({
    data: {
      title: 'Nocleg w schronisku',
      amount: 450.0,
      description: '3 noce × 3 osoby',
      tripId: trip.id,
      paidById: trip.participants[0].id,
    },
  });

  console.log('Wydatki dodane.');
  console.log('Baza danych zaseedowana pomyślnie!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });