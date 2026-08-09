import * as fs from 'fs';

const plik: string = "elo-żelo.txt";

function eloZelo(ilosc_elozelo: number): void {
    for (let i = 0; i < ilosc_elozelo; i++) {
        const zawartosc: string = "Elo Żelo\n".repeat(ilosc_elozelo);
        fs.writeFileSync(plik, zawartosc, "utf8");
    }
}

let minuty: number = new Date().getMinutes();

eloZelo(minuty);
