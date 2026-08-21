import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    const trip = await prisma.trip.create({
        data: {
            destination: 'Międzyzdroje',
            start_date: new Date('2026-08-20'),
            end_date: new Date('2026-08-31'),
            status: 'ACTIVE',
        },
    });

    const participant = await prisma.participant.create({
        data: {
            trip_id: trip.id,
            name: 'Cezary Zatylny',
            email: 'czarek.zatylny@gmail.com',
            role: 'ORGANIZER',
        },
    });

    await prisma.expense.create({
        data: {
            trip_id: trip.id,
            payer_id: participant.id,
            amount: 1000,
            category: 'ACCOMMODATION',
            description: 'Hotel',
            createdAt: new Date('2026-08-20'),
        },
    })

    console.log('Baza załadowana');

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });