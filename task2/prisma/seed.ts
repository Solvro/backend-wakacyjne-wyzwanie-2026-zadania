import { CurrencyEnum } from '@prisma/client';

import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../src/database/database.service';

@Injectable()
export class SeedService {
  constructor(private readonly database: DatabaseService) {}

  async run() {
    const participant1 = await this.database.participant.upsert({
      where: { participant_id: 1 },
      update: {},
      create: {
        name: 'Kuba',
        surname: 'Kowalczyk',
        phone: '1234567890',
        age: 22,
      },
    });

    const participant2 = await this.database.participant.upsert({
      where: { participant_id: 2 },
      update: {},
      create: {
        name: 'Dawid',
        surname: 'Rychlicki',
        phone: '5543454522',
        age: 22,
      },
    });

    const trip1 = await this.database.trip.upsert({
      where: { trip_id: 1 },
      update: {},
      create: {
        title: 'Summer Trip',
        description: 'Vacation in the mountains',
        start_date: new Date(),
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const trip2 = await this.database.trip.upsert({
      where: { trip_id: 2 },
      update: {},
      create: {
        title: 'Winter Trip',
        description: 'Skiing in the Alps',
        start_date: new Date(),
        end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    });

    await this.database.participant_Trip.createMany({
      data: [
        { participant_id: participant1.participant_id, trip_id: trip1.trip_id },
        { participant_id: participant2.participant_id, trip_id: trip1.trip_id },
        { participant_id: participant1.participant_id, trip_id: trip2.trip_id },
      ],
    });

    await this.database.expense.upsert({
      where: { expense_id: 1 },
      update: {},
      create: {
        price: 100.5,
        currency: CurrencyEnum.USD,
        participant_id: participant1.participant_id,
        trip_id: trip1.trip_id,
      },
    });

    await this.database.expense.upsert({
      where: { expense_id: 2 },
      update: {},
      create: {
        price: 75.25,
        currency: CurrencyEnum.EUR,
        participant_id: participant2.participant_id,
        trip_id: trip1.trip_id,
      },
    });
  }
}

const database = new DatabaseService();
const seeder = new SeedService(database);

async function main() {
  await seeder.run();
  await database.$disconnect();
}

main().catch((error: unknown) => {
  console.error(error);
});
