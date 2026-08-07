import { writeFileSync } from 'fs';

function eloZelo(a: number) {
    writeFileSync('./elo-żelo.txt', 'Elo żelo\n'.repeat(a));
}

const d = new Date();
let minutes = d.getMinutes();
eloZelo(minutes);