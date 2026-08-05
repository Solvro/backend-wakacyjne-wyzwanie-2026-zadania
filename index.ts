import fs from "node:fs";

function eloZelo(times: number): void {
    fs.writeFile(
        "elo-żelo.txt",
        "Elo żelo\n".repeat(times),
        (err: any): void | null => err && console.error(err),
    );
}

const minutes: number = new Date().getMinutes();

eloZelo(minutes);
