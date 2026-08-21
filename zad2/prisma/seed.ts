import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {

  const participant = await prisma.participant.create({
    data: {
      first_name: 'Jan',
      last_name: 'Kowalski',
      date_of_birth: new Date('1998-05-15'),
      gender: 'MALE',
    },
  });

  const trip = await prisma.trip.create({
    data: {
      trip_start_date: new Date('2026-07-01T08:00:00Z'),
      trip_end_date: new Date('2026-07-10T18:00:00Z'),
      cost: 2450.50,
      num_spots: 20,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      amount: 150.75,
      date: new Date('2026-07-02T12:30:00Z'),
      participant_id: participant.id,
      trip_id: trip.id,
    },
  });

  console.log('Pomyślnie dodano dane testowe:');
  console.log({ participant, trip, expense });
}

main()
  .catch((e) => {
    console.error('Błąd podczas seedowania:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });