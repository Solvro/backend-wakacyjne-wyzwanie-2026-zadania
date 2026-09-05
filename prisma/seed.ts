import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seedowanie bazy danych...');

  const participant1 = await prisma.participant.create({
    data: {
      Name: 'Jan Kowalski',
      Email: 'jan@example.com',
      Age: 25,
      Phone: '123456789',
    },
  });

  const participant2 = await prisma.participant.create({
    data: {
      Name: 'Anna Nowak',
      Age: 28,
      Phone: '987654321',
    },
  });

  const trip = await prisma.trip.create({
    data: {
      Location: 'Kraków',
      Begin_date: new Date('2026-07-01'),
      End_date: new Date('2026-07-10'),
    },
  });

  await prisma.tripParticipant.createMany({
    data: [
      { Trip_id: trip.Trip_id, Participant_id: participant1.Participant_id },
      { Trip_id: trip.Trip_id, Participant_id: participant2.Participant_id },
    ],
  });

  await prisma.expense.create({
    data: {
      Trip_id: trip.Trip_id,
      Payer_id: participant1.Participant_id,
      Type: 'FOOD',
      Amount: 150.5,
    },
  });

  console.log('Seed zakończony pomyślnie.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });