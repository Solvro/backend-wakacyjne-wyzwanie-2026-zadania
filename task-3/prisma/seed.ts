import { PrismaClient, Currency } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function seed() {
  const [alice, bob, carol] = await Promise.all([
    prisma.participant.upsert({
      where: { email: 'alice@example.com' },
      update: {},
      create: {
        firstName: 'Alice',
        lastName: 'Kowalska',
        email: 'alice@example.com',
        adult: true,
      },
    }),
    prisma.participant.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        firstName: 'Bob',
        lastName: 'Nowak',
        email: 'bob@example.com',
        adult: true,
      },
    }),
    prisma.participant.upsert({
      where: { email: 'carol@example.com' },
      update: {},
      create: {
        firstName: 'Carol',
        lastName: 'Wisniewska',
        email: 'carol@example.com',
        adult: false,
      },
    }),
  ]);

  const trip = await prisma.trip.upsert({
    where: { title: 'Turkey' },
    update: {},
    create: {
      title: 'Turkey',
      description: 'Wyjazd turystyczny do Turcji',
      maxSlots: 10,
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-10'),
    },
  });

  await Promise.all(
    [alice, bob, carol].map((participant, index) =>
      prisma.tripParticipant.upsert({
        where: {
          tripId_participantId: {
            tripId: trip.id,
            participantId: participant.id,
          },
        },
        update: {},
        create: {
          tripId: trip.id,
          participantId: participant.id,
          slotNumber: index + 1,
        },
      }),
    ),
  );

  await prisma.expense.createMany({
    data: [
      {
        value: 120.5,
        currency: Currency.PLN,
        tripId: trip.id,
        participantId: alice.id,
      },
      {
        value: 45,
        currency: Currency.EUR,
        tripId: trip.id,
        participantId: bob.id,
      },
    ],
  });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
  });
