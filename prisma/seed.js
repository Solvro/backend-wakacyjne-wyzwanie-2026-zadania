import { PrismaClient, ExpenseCategory } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
const adapter = new PrismaPg({ connectionString: "postgresql://postgres:3450Dmeme@localhost:5432/test?schema=public" });
const prisma = new PrismaClient({ adapter });
async function main() {
    // Clean up existing records
    await prisma.expense.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.trip.deleteMany();
    // 1. Create a Trip
    const trip = await prisma.trip.create({
        data: {
            title: 'Summer Solvro Camp 2026',
            budget: 1500.0,
            startDate: new Date('2026-07-01T10:00:00Z'),
            endDate: new Date('2026-07-07T18:00:00Z'),
        },
    });
    // 2. Create a Participant
    const participant = await prisma.participant.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            tripId: trip.id,
        },
    });
    // 3. Create an Expense
    const expense = await prisma.expense.create({
        data: {
            title: 'Group Dinner',
            amount: 145.5,
            category: ExpenseCategory.FOOD,
            tripId: trip.id,
            payerId: participant.id,
        },
    });
    console.log('Seeding completed successfully!');
    console.log({ trip, participant, expense });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
