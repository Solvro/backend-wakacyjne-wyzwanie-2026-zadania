import * as fs from "node:fs";

const eloZelo = (min: number) => {
    const content = "Elo żelo\n".repeat(min);

    try {
        fs.writeFileSync("example.ts", content);
    } catch (error) {
        console.error("Error writing file:", error);
    }
};

const min = new Date().getMinutes();
eloZelo(min);