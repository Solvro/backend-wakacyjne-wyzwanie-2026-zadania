import * as fs from 'fs';

function eloZelo(ilosc: number): void{
    const tekst: string = 'Elo żelo\n'.repeat(ilosc);
    fs.writeFileSync('elo-żelo.txt', tekst);
}

const minuty: number = new Date().getMinutes();
eloZelo(minuty);