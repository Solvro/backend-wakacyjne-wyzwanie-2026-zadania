import { PrismaClient, TripStatus } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: "postgresql://postgres:28302007@localhost:5432/trip?schema=public"})
const prisma = new PrismaClient({adapter});

async function main() {
  // Clean up existing data in reverse order of foreign key dependencies
  await prisma.expense.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  // Create a trip with nested participants and expenses
  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje w Hiszpanii',
      status: TripStatus.PLANNED,
      startDate: new Date('2026-07-01'),
      participants: {
        create: [
          {
            name: 'Jan Kowalski',
            email: 'jan.kowalski@example.com',
            phone: '+48123456789',
          },
          {
            name: 'Anna Nowak',
            email: 'anna.nowak@example.com',
          },
        ],
      },
      expenses: {
        create: [
          {
            amount: 450.0,
            description: 'Bilety lotnicze',
            date: new Date('2026-05-10'),
          },
          {
            amount: 120.5,
            description: 'Zaliczka za hotel',
            date: new Date('2026-05-12'),
          },
        ],
      },
    },
  });

  console.log('Seedowanie zakończone sukcesem:', trip.name);
}

main()
  .catch((e) => {
    console.error('Błąd podczas seedowania:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });