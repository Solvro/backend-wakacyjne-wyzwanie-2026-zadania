import { PrismaClient, TripStatus, ExpenseType } from '@prisma/client';



const prisma = new PrismaClient();

async function main() {
 
  const trip = await prisma.trip.create({
    data: {
      destination: 'Paryż',
      hotelName: 'Hotel Louvre',
      departurePlace: 'Warszawa',
      departureDate: new Date('2024-06-01T10:00:00Z'),
      returnDate: new Date('2024-06-07T18:00:00Z'),
      status: TripStatus.ON_SALE,
    },
  });

  
  await prisma.participant.create({
    data: {
      firstName: 'Jan',
      lastName: 'Kowalski',
      tripId: trip.id, 
    },
  });

 
  await prisma.expense.create({
    data: {
      type: ExpenseType.FOOD,
      amount: 150.50,
      tripId: trip.id,
    },
  });

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });