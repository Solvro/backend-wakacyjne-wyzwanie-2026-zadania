import * as fs from 'node:fs';

function eloZelo(n: number): void {
    let content = '';
    
    for (let i = 0; i < n; i++) {
        content += 'Elo żelo\n';
    }
    content = content.trim();

    try {
        fs.writeFileSync('elo-żelo.txt', content);
    } catch (err) {
        console.error(err);
    }
}

const minutes = new Date().getMinutes();
eloZelo(minutes);