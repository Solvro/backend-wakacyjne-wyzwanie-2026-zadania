import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.expense.deleteMany();
  await prisma.participantsTrips.deleteMany();
  await prisma.participant.deleteMany();
  await prisma.trip.deleteMany();

  const trip = await prisma.trip.create({
    data: {
      name: 'Wyjazd do Grecji',
      startDate: new Date('2026-08-27'),
      endDate: new Date('2026-08-31'),
      description: 'Wyjazd rodzinny do Grecji, Ateny',
    },
  });

  const participant = await prisma.participant.create({
    data: {
      name: 'Jakub',
      surname: 'Luzak',
      birthDate: new Date('2005-10-27'),
      nationality: 'POLISH',
      email: 'jakub.luzak@gmail.com',
    },
  });

  const participantTrip = await prisma.participantsTrips.create({
    data: {
      id_trip: trip.id,
      id_participant: participant.id,
    },
  });

  const expense = await prisma.expense.create({
    data: {
      id_participant: participant.id,
      id_trip: trip.id,
      amount: 21.37,
      currency: 'EUR',
      date: new Date(),
    },
  });

  console.log('Seedowanie przebiegło pomyślnie:');
  console.log({ trip, participant, participantTrip, expense });
}

main()
  .catch((e) => {
    console.error('Błąd podczas seedowania:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });