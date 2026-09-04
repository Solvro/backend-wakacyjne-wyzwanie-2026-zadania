import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    const participant = await prisma.participant.create({
        data: {
            name: 'Jan Kowalski',
            email: 'jan@email.com',
            status: 'active',
            expenses: {
                create: {
                    title: 'Obiad w schronisku',
                    amount: 50.00,
                    currency: 'PLN',
                    date: new Date(),
                    trip: {
                        create: {
                            title: 'Wakacje w Tatrach',
                            start_date: new Date('2026-09-01'),
                            end_date: new Date('2026-09-07'),
                            description: 'Wyjazd w góry',
                        },
                    },
                },
            },
        },
    });

    console.log('Utworzono uczestnika i powiązane dane:', participant);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });