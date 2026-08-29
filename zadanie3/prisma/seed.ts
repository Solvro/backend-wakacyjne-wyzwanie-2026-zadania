import { PrismaClient, City, Food, Diet, Type} from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const prisma = new PrismaClient({
    adapter: new PrismaPg({connectionString: process.env.DATABASE_URL as string}),
});

async function main(){

    const singapure = await prisma.trip.create({
        data:{
            city: City.SINGAPORE,
            food: Food.ALL_INCLUSIVE,
            participants: {
                create: {
                    name: "Leo",
                    surname: "Choi",
                    date_of_birth: new Date("2002-01-12"),
                    diet: Diet.VEGETARIAN,
                }
            },
            expenses:{
                create: {
                    amount: 8000,
                    type: Type.ACCOMMODATION,
                }
            }
        }
    })

    const tokyo = await prisma.trip.create({
        data:{
            city: City.TOKYO,
            food: Food.BREAKFAST,
            participants: {
                create: {
                    name: "Angelina",
                    surname: "Kim",
                    date_of_birth: new Date("2006-12-18"),
                    diet: Diet.GLUTEN_FREE,
                },
            },
            expenses:{
                createMany: {
                    data:[
                        {
                            amount: 3000,
                            type: Type.TRANSPORTATION,
                        },
                        {
                            amount: 1000,
                            type: Type.FOOD,
                        }
                    ]
                
                }
            }
        }
    })

    const szanghai = await prisma.trip.create({
        data:{
            city: City.SZANGHAI,
            food: Food.WITHOUT,
            participants: {
                create: {
                    name: "Luis",
                    surname: "Lim",
                    date_of_birth: new Date("2009-02-14"),  
                }
            },
            expenses:{
                create: {
                    amount: 13000,
                    type: Type.ACCOMMODATION,
                }
            }
        }
    })

    console.log({singapure,tokyo,szanghai})
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