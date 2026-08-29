import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // 1. Tworzenie wycieczki
  const trip = await prisma.trip.create({
    data: {
      Trip_Name: 'Czechy',
      Destination: 'Praga',
      Start_Date: new Date('2026-07-01'),
      End_Date: new Date('2026-07-10'),
    },
  });

  // 2. Tworzenie uczestnika przypisanego do wycieczki
  const participant = await prisma.participant.create({
    data: {
      Trip_id: trip.Trip_id,
      Name: 'Marek',
      Surname: 'Stonoga',
      Pesel: '98010112345',
    },
  });

  // 3. Tworzenie wydatku przypisanego do wycieczki i uczestnika
  await prisma.expense.create({
    data: {
      Trip_id: trip.Trip_id,
      Participant_id: participant.Participant_id,
      Amount: 150.5,
      Category: 'Jedzenie',
    },
  });

  console.log('Seedowanie zakończone sukcesem! (jupi!)');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });