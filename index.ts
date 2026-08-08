import * as fs from 'fs';

function eloZelo(count: number): void {
    const text = 'eloZelo\n'.repeat(count);
    fs.writeFileSync('eloZelo.txt', text, 'utf8');
}
const currentMin: number = new Date().getMinutes();

eloZelo(currentMin);