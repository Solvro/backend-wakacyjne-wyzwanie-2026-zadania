import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const trip = await prisma.trip.create({
    data: { destination: 'Rzym', startDate: new Date() },
  });

  const participant = await prisma.participant.create({
    data: { name: 'Jan Kowalski', tripId: trip.id },
  });

  await prisma.expense.create({
    data: {
      cost: 120.50,
      date: new Date(),
      tripId: trip.id,
      participantId: participant.id,
      description: 'Paliwo',
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { 
    await prisma.$disconnect(); 
    await pool.end();
  });