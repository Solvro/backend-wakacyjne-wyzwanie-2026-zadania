import * as fs from 'fs';

function eloZelo(num: number): void {
    try {
        fs.writeFileSync('elo-zelo.txt', 'Elo żelo\n'.repeat(num));
    } catch (error) {
        console.error('Error', error);
    }
}

eloZelo(new Date().getMinutes());