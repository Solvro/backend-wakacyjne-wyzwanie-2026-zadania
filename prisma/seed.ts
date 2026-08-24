import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, TripStatus, ExpenseCategory } from '../generated/prisma'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  const michal = await prisma.participant.create({
    data: {
      name: 'Michal',
      surname: 'Woźniak',
      email: 'michal420@example.com',
      tel: '123456789',
    },
  })

  const trip = await prisma.trip.create({
    data: {
      title: 'Morze',
      participant: michal.ParticipantID, 
      place: 'Jastarnia',
      start: new Date('2026-07-01'),
      end: new Date('2026-07-10'),
      cost: 3000.0,
      status: TripStatus.PLANNED,
    },
  })

  await prisma.expense.create({
    data: {
      note: 'Bilety lotnicze',
      payerID: michal.ParticipantID,
      tripID: trip.TripID,
      amount: 800.0,
      category: ExpenseCategory.TICKETS,
    },
  })

  console.log('Seed zakończony pomyślnie!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
