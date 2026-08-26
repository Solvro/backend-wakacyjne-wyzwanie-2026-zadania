import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const trip = await prisma.trip.create({
        data: {
        city: 'Barcelona',
        country: 'Hiszpania',
        startDate: new Date('2026-09-10'),
        endDate: new Date('2026-09-17'),
        },
    });

    const participant = await prisma.participant.create({
        data: {
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@example.com',
        tripId: trip.id,
        },
    });

    await prisma.expense.create({
        data: {
        description: 'Bilety wstępu do Sagrada Familia',
        value: 120.50,
        participantId: participant.id,
        },
    });
    console.log("Seed Finished");
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });