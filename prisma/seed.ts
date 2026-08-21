import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const italy = await prisma.trip.create({
    data: {
      location: 'Italy',
      start: new Date(2026, 8, 22),
      end: new Date(2026, 9, 18),

      participants: {
        create: {
          name: 'Dawid',
          surname: 'Citak',
          email: 'dawid.citak@wp.pl',
          pesel: '12121212121',
          phone_number: '+48111111111',

          expenses: {
            create: {
              price: 10.22,
              date: new Date(2026, 9, 1)
            },
          },
        },
      },
    },
  });
  console.log({italy});
};
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