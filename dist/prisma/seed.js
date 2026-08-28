"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
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
//# sourceMappingURL=seed.js.map