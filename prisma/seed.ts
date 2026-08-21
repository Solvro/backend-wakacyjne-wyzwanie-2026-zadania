import { DatabaseService } from '../src/database/database.service';

const db = new DatabaseService();

async function main() {
  await db.expense.deleteMany();
  await db.participantsTrips.deleteMany();
  await db.participant.deleteMany();
  await db.trip.deleteMany();

  const trip = await db.trip.create({
    data: {
      name: 'Wyjazd do Grecji',
      startDate: new Date('2026-08-27'),
      endDate: new Date('2026-08-31'),
      description: 'Wyjazd rodzinny do Grecji, Ateny',
    },
  });

  const participant = await db.participant.create({
    data: {
      name: 'Jakub',
      surname: 'Luzak',
      birthDate: new Date('2005-10-27'),
      nationality: 'POLISH',
      email: 'jakub.luzak@gmail.com',
    },
  });

  const participantTrip = await db.participantsTrips.create({
    data: {
      id_trip: trip.id,
      id_participant: participant.id,
    },
  });

  const expense = await db.expense.create({
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
    await db.$disconnect();
  });