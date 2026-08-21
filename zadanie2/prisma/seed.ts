import { PrismaClient, Miasto, Wyzywienie, Dieta, Rodzaj} from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const prisma = new PrismaClient({
    adapter: new PrismaPg({connectionString: process.env.DATABASE_URL as string}),
});

async function main(){

    const singapur = await prisma.trip.create({
        data:{
            miasto: Miasto.SINGAPUR,
            wyzywienie: Wyzywienie.ALL_INCLUSIVE,
            participants: {
                create: {
                    imie: "Leo",
                    nazwisko: "Choi",
                    data_urodzenia: new Date("2002-01-12"),
                    dieta: Dieta.WEGETARIANSKA,
                }
            },
            expenses:{
                create: {
                    kwota: 8000,
                    rodzaj: Rodzaj.ZAKWATEROWANIE,
                }
            }
        }
    })

    const tokio = await prisma.trip.create({
        data:{
            miasto: Miasto.TOKIO,
            wyzywienie: Wyzywienie.SNIADANIA,
            participants: {
                create: {
                    imie: "Angelina",
                    nazwisko: "Kim",
                    data_urodzenia: new Date("2006-12-18"),
                    dieta: Dieta.BEZGLUTENOWA,
                },
            },
            expenses:{
                createMany: {
                    data:[
                        {
                            kwota: 3000,
                            rodzaj: Rodzaj.TRANSPORT,
                        },
                        {
                            kwota: 1000,
                            rodzaj: Rodzaj.WYZYWIENIE,
                        }
                    ]
                
                }
            }
        }
    })

    const szanghaj = await prisma.trip.create({
        data:{
            miasto: Miasto.SZANGHAJ,
            wyzywienie: Wyzywienie.BEZ_WYZYWIENIA,
            participants: {
                create: {
                    imie: "Luis",
                    nazwisko: "Lim",
                    data_urodzenia: new Date("2009-02-14"),  
                }
            },
            expenses:{
                create: {
                    kwota: 13000,
                    rodzaj: Rodzaj.ZAKWATEROWANIE,
                }
            }
        }
    })

    console.log({singapur,tokio,szanghaj})
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