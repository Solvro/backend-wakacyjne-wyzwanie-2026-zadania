import fs from 'fs';

const minutes = new Date().getMinutes();

function eloZelo(count: number) {
    fs.writeFileSync('elo-żelo.txt', "Elo żelo\n".repeat(count).trim());
}
eloZelo(minutes);