import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import {
  Currency,
  ExpenseStatus,
  PrismaClient,
  TripStatus,
} from 'src/generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const participant = await prisma.participant.create({
    data: {
      first_name: 'Jan',
      last_name: 'Kowalski',
      birth_date: new Date('1970-01-01'),
      phone_number: '123123123',
      email: 'jankowalski@mail.com',
    },
  });

  const trip = await prisma.trip.create({
    data: {
      name: 'Wakacje w Chorwacji',
      destination: 'Chorwacja',
      description: 'Wakacje w Chorwacji ze znajomymi',
      start_date: new Date('2027-07-01'),
      end_date: new Date('2027-07-07'),
      status: TripStatus.notStarted,
    },
  });

  await prisma.trip_Participant.create({
    data: {
      trip_id: trip.id,
      participant_id: participant.id,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      name: 'Hotel',
      trip_id: trip.id,
      participant_id: participant.id,
      amount: 300,
      currency: Currency.EUR,
      status: ExpenseStatus.pending,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
