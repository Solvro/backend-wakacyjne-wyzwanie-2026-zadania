import { prisma } from '../src/lib/prisma';

async function main() {
  const participant = await prisma.participant.create({
    data: {
      name: "Jan",
      last_name: "Kowalski",
      phone: "123456789",
      email: "jan.kowalski@example.com",
      birthday_date: new Date("1995-05-15T00:00:00Z"),
    },
  });
  console.log("Dodano uczestnika:", participant.name, participant.last_name);

  const expense = await prisma.expense.create({
    data: {
      name: "Bilet wstępu do muzeum",
      price: 50.0,
      type_of_expense: "Atrakcja",
    },
  });
  console.log("Dodano wydatek:", expense.name);

  const trip = await prisma.trip.create({
    data: {
      destination: "Paryż",
      date_of_trip: new Date("2026-09-10T08:00:00Z"),
      price: 1500.0,
      type_of_trip: "Zwiedzanie",
    },
  });
  console.log("Dodano wycieczkę do:", trip.destination);

  await prisma.tripParticipant.create({
    data: {
      id_trip: trip.id,
      id_participant: participant.id,
    },
  });
  console.log("Przypisano Jana do wycieczki.");

  await prisma.tripExpense.create({
    data: {
      id_trip: trip.id,
      id_expense: expense.id,
    },
  });
  console.log("Przypisano wydatek do wycieczki.");

  const tripWithDetails = await prisma.trip.findUnique({
    where: { id: trip.id },
    include: {
      tripParticipants: {
        include: {
          participant: true,
        },
      },
      tripExpenses: {
        include: {
          expense: true,
        },
      },
    },
  });

  console.log("\n--- REZULTAT Z BAZY ---");
  console.log(JSON.stringify(tripWithDetails, null, 2));
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });