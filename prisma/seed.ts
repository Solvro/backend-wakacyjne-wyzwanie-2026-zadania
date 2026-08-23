import "dotenv/config"
import {PrismaClient, Category, Currency } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({adapter});

async function main() {
    const trip = await prisma.trip.create({
        data:{
            destination: "Mazury",
            description: "super fajna wycieczka",
            startDate: new Date("2026-01-10"),
            endDate: new Date("2026-01-13"),
            budget: 2000.00
        }
    });
    const kamilNowak = await prisma.participant.create({
        data:{
            firstName: "Kamil",
            lastName: "Nowak",
            email: "wcale.nie.kamil.nowak@uczelnia.w.polsce",
            dateJoined: new Date("2026-01-01"),
            trip: {
                connect: {
                    id: trip.id
                },
            },
        },
    });

    const wydatek_1 = await prisma.expense.create({
        data:{
            amount: 40.00,
            description: "Pad Udon",
            expenseDate: new Date("2026-01-11"),
            category: Category.FOOD_AND_DRINK,

            trip :{
                connect:{
                    id: trip.id
                },
            },
            paidBy:{
                connect:{
                    id: kamilNowak.id
                },
            },

        },
    });
    const wydatek_2 = await prisma.expense.create({
        data:{
            amount:20.00,
            expenseDate: new Date("2026-01-12"),

            trip :{
                connect:{
                    id: trip.id
                },
            },
            paidBy:{
                connect:{
                    id: kamilNowak.id
                },
            },
        }
    })
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