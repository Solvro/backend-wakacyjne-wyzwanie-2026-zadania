import 'dotenv/config';
import { PrismaClient, Status } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {

  const trip = await prisma.trip.create({
    data: {
      name: 'Wyjazd w Tatry',
      startDate: new Date('2026-09-01'),
      endDate: new Date('2026-09-07'),
      status: Status.PLANNING,
    },
  });


  const participant = await prisma.participant.create({
    data: {
      nameParticipant: 'Jan',
      surnameParticipant: 'Kowalski',
      phone: '432561222',
      email: 'jan.kowalski@gmail.com',
    },
  });


  const tripParticipant = await prisma.tripParticipant.create({
    data: {
      tripId: trip.id,
      participantId: participant.id,
    },
  });


  await prisma.expense.create({
    data: {
      title: 'Schronisko w Dolinie Chochołowskiej',
      amount: 250.50,
      depositDate: new Date(),
      tripParticipantId: tripParticipant.id,
    },
  });

  console.log('Seeding has been correctly completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });