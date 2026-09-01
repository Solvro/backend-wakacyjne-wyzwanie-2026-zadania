import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const trip = await prisma.trip.create({
    data: {
      name: 'Sierpniowe Tatry',
      startDate: new Date(),
      description: 'Atak na Bulę pod Rysami i Kościelec',
      participants: {
        create: [{ name: 'Franek' }],
      },
      expenses: {
        create: [{ amount: 350.0, currency: 'PLN' }],
      },
    },
  });
  console.log('Dane zostały zseedowane! Dodano wyjazd:', trip.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
