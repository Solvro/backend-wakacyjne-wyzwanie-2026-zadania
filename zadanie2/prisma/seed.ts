import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Currency, type Participant, type Trip } from "../generated/prisma/client";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Zaseedować można tylko raz, bo wystąpią duplikaty.

async function main() {
  const participants: Participant[] = [];

  for (let i = 1; i <= 5; i++) {
    const participant = await prisma.participant.create({
      data: {
        name: `Uczestnik ${i}`,
        age: 18 + i,
        email: `user${i}@example.com`,
      },
    });

    participants.push(participant);
  }

  const trips: Trip[] = [];

  for (let i = 1; i <= 2; i++) {
    const trip = await prisma.trip.create({
      data: {
        name: `Wycieczka ${i}`,
        destination: i === 1 ? "Barcelona" : "Madryt",
        created_at: new Date(),
      },
    });

    trips.push(trip);
  }

  for (const participant of participants) {
    for (const trip of trips) {
      await prisma.participantTrip.create({
        data: {
          participant_id: participant.id,
          trip_id: trip.id,
        },
      });
    }
  }

  for (let i = 1; i <= 5; i++) {
    await prisma.expense.create({
      data: {
        title: `Wydatek ${i}`,
        amount: i * 100,
        currency: Currency.EUR,
        participant_id: participants[i - 1].id,
        trip_id: trips[i % 2].id,
      },
    });
  }

  console.log("Seed zakonczony!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });