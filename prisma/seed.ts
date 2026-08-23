import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '../src/generated/prisma/client';
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
    const trip = await prisma.trip.create({
        data: {
            name: 'Wakacje w Chorwacji',
            destination: 'Split',
            startDate: new Date('2026-07-10'),
            endDate: new Date('2026-07-20'),
            budget: 5000.0,
        },
    });

    const anna = await prisma.participant.create({
        data: {
            name: 'Anna',
            surname: 'Kowalska',
            email: 'anna.kowalska@example.com',
            tripId: trip.id,
        },
    });

    const jan = await prisma.participant.create({
        data: {
            name: 'Jan',
            surname: 'Nowak',
            email: 'jan.nowak@example.com',
            tripId: trip.id,
        },
    });

    const expense1 = await prisma.expense.create({
        data: {
            title: 'Nocleg – apartament',
            amount: 1800.5,
            category: 'ACCOMMODATION',
            note: 'Zaliczka zapłacona z góry',
            tripId: trip.id,
            payerId: anna.id,
        },
    });

    const expense2 = await prisma.expense.create({
        data: {
            title: 'Paliwo',
            amount: 450.0,
            category: 'TRANSPORT',
            tripId: trip.id,
            payerId: jan.id,
        },
    });

    console.log({ trip, anna, jan, expense1, expense2 });
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