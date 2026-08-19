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
      Name: 'Wyjazd w Tatry',
      StartDate: new Date('2026-09-01'),
      EndDate: new Date('2026-09-07'),
      Status: Status.PLANNING,
    },
  });


  const participant = await prisma.participant.create({
    data: {
      NameP: 'Jan',
      SurnameP: 'Kowalski',
      Phone: '432561222',
      Email: 'jan.kowalski@gmail.com',
    },
  });


  const tripParticipant = await prisma.tripParticipant.create({
    data: {
      TripId: trip.IdT,
      ParticipantId: participant.Id,
    },
  });


  await prisma.expense.create({
    data: {
      Title: 'Schronisko w Dolinie Chochołowskiej',
      Amount: 250.50,
      DepositDate: new Date(),
      TripParticipantId: tripParticipant.IdTP,
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