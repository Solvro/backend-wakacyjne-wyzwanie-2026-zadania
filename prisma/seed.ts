import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, PaymentStatus } from '../generated/prisma';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.expense.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.trip.deleteMany();

    const myTrip = await prisma.trip.create({
        data: {
            TripDate: new Date('2026-08-30T09:00:00Z'),
            Destination: 'Wrocław',
            Participants: {
                create: {
                    Name: 'Włodzimierz',
                    Surname: 'Biały',
                    ContactNumber: '+48123456789',
                    PaymentStatus: PaymentStatus.Paid,
                },
            },
            Expenses: {
                create: {
                    ExpenseName: 'Pizzerka',
                    Cost: 6.70,
                },
            },
        },
    });

    console.log('Success');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });