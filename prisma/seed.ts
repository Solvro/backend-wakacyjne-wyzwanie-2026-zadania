import { DatabaseService } from "../src/database/database.service";
import "dotenv/config";

const dbs: DatabaseService = new DatabaseService();

async function seed() {
    const john = await dbs.person.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            dob: new Date(1975, 2, 20),
            gender: "MALE"
        }
    });
    const jane = await dbs.person.create({
        data: {
            first_name: "Jane",
            last_name: "Doe",
            dob: new Date(1979, 3, 26),
            gender: "FEMALE"
        }
    });
    const saxony = await dbs.trip.create({
        data: {
            name:  "Trip to the Saxon mountains",
            description: "I don't know much about these mountains, but I'm kinda looking forward to this, and you should too!",
            start_time: new Date(2026, 7, 30, 13, 30),
            end_time: new Date(2026, 8, 3, 10),
            expenses: {
                create: [{
                    name: "Maintenance (Rough Estimate)",
                    value: 600.00
                }, {
                    name: "Fuel (Also Rough Estimate",
                    value: 200.00
                }]
            },
            participants: {
                create: [
                    {
                        personId: john.id
                    }, {
                        personId: jane.id
                    }
                ]
            }
        }
    });
}

seed().then(async () => {
    await dbs.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await dbs.$disconnect();
    process.exit(1);
});