import * as fs from 'fs';

function eloZelo(ilosc_elozelo: number): void {
    const plik: string = "elo-żelo.txt";

    const zawartosc: string = "Elo Żelo\n".repeat(ilosc_elozelo);
    fs.writeFileSync(plik, zawartosc, "utf8");
}

let minuty: number = new Date().getMinutes();

try {
    eloZelo(minuty);
} catch (e) {
    console.error(e, "nie udalo sie prawidlowo utworzyc pliku");
}